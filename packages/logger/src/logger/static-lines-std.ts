import { EventEmitter } from 'node:events';

/**
 * Compares two multi-line strings and extracts lines from the second string (str2)
 * that are different from the first string (str1) based on a simple line-by-line comparison.
 * This is a basic heuristic and not a full-fledged diff algorithm.
 *
 * @param str1 The first multi-line string.
 * @param str2 The second multi-line string.
 * @returns A strings, containing lines from str2 that differ or are new.
 */
function getDiffLines(str1: string, str2: string): string {
  // Split both strings into arrays of lines.
  // Use a regex to handle both Unix-style (\n) and Windows-style (\r\n) line endings.
  const lines1 = str1.trimEnd().split(/\n/);
  const lines2 = str2.trimEnd().split(/\n/);

  let diffLines = ''; // Initialize an array to store the different lines from str2
  let i = 0; // Pointer for lines1
  let j = 0; // Pointer for lines2

  // Iterate through both arrays of lines
  while (i < lines1.length || j < lines2.length) {
    if (i < lines1.length && j < lines2.length) {
      // Both strings still have lines to compare
      if (lines1[i] !== lines2[j]) {
        // If the lines are different, add the line from str2 to the result.
        diffLines += `${lines2[j]}\n`;
        // Move to the next line in str2.
        // We keep 'i' the same to see if the current line in str1 matches
        // any subsequent line in str2 (this is a simplified heuristic).
        j++;
      } else {
        // If the lines are identical, move to the next line in both strings.
        i++;
        j++;
      }
    } else if (j < lines2.length) {
      // If str1 has run out of lines but str2 still has lines,
      // these remaining lines in str2 are considered "new" or "different".
      diffLines += `${lines2[j]}\n`;
      j++;
    } else {
      // If str2 has run out of lines (or both have), break the loop.
      break;
    }
  }
  return diffLines;
}

export class StaticLinesStdout extends EventEmitter {
  get columns() {
    return this.width;
  }

  constructor(
    private width: number,
    private _write: (content: string) => void,
  ) {
    super();
  }

  #lastFrame: string = '';

  write = (frame: string) => {
    const printingLines = getDiffLines(this.#lastFrame, frame);
    if (printingLines) this._write(printingLines);
    this.#lastFrame = frame;
  };
}
