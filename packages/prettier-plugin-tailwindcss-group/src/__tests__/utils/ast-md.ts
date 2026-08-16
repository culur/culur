import type { Options, Plugin } from 'prettier';
import fs from 'node:fs';
import * as tailwindPlugin from 'prettier-plugin-tailwindcss';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import plugin from '../..';

export interface AstNode {
  type: string;
  [key: string]: unknown;
}

export interface ParentNode extends AstNode {
  children: AstNode[];
}

export interface HtmlNode extends AstNode {
  type: 'html';
  value: string;
}

export interface CodeNode extends AstNode {
  type: 'code';
  lang?: string;
  value: string;
}

export interface TestCase {
  id: string;
  options: Options;
  input: string;
  expected: string;
}

export function parseTestCaseOptions(metaStr: string): {
  id: string;
  options: Options;
} {
  const parts = metaStr.trim().split(/\s+/);
  const id = parts[0] || 'unnamed-test';
  const options: Options = {
    plugins: [plugin, tailwindPlugin as unknown as Plugin],
  };

  for (let i = 1; i < parts.length; i++) {
    const [key, val] = parts[i].split('=');
    if (key && val) {
      if (!Number.isNaN(Number(val))) {
        options[key] = Number(val);
      } else if (val === 'true' || val === 'false') {
        options[key] = val === 'true';
      } else {
        options[key] = val;
      }
    }
  }

  return { id, options };
}

function normalizeJsx(code: string): string {
  const trimmed = code.trim();
  return trimmed.endsWith(';') ? trimmed : `${trimmed};`;
}

export function extractTestCasesFromMarkdown(filePath: string): TestCase[] {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const tree = remark().use(remarkParse).parse(fileContent) as unknown as ParentNode;
  const testCases: TestCase[] = [];

  const children = tree.children;
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (node.type === 'html') {
      const htmlNode = node as HtmlNode;
      const match = htmlNode.value.match(/<!--\s*test-case:([^\n]+?)-->/);
      if (match) {
        const { id, options } = parseTestCaseOptions(match[1]);

        // Look ahead for the next two `code` nodes
        const codeNodes: CodeNode[] = [];
        for (let j = i + 1; j < children.length && codeNodes.length < 2; j++) {
          if (children[j].type === 'code') {
            codeNodes.push(children[j] as CodeNode);
          }
        }

        if (codeNodes.length === 2) {
          testCases.push({
            id,
            options,
            input: normalizeJsx(codeNodes[0].value),
            expected: normalizeJsx(codeNodes[1].value),
          });
        }
      }
    }
  }

  return testCases;
}
