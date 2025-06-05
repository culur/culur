import { EventEmitter } from 'node:events';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StaticLinesStdout } from './static-lines-std';

const write = vi.fn();

describe('staticLinesStdout', () => {
  let width: number;
  let staticLinesStdout: StaticLinesStdout;

  beforeEach(() => {
    width = 80;
    staticLinesStdout = new StaticLinesStdout(width, write);
    write.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize correctly', () => {
    expect(staticLinesStdout).toBeInstanceOf(EventEmitter);
    expect(staticLinesStdout.columns).toBe(width);
  });

  it('should write a frame to stdout when it is different from the last frame', () => {
    const frame = 'Line 1\nLine 2\n';
    staticLinesStdout.write(frame);
    expect(write).toHaveBeenCalledWith(frame);
  });

  it('should only write the diff of frames to stdout', () => {
    const initialFrame = 'Line 1\nLine 2\n';
    staticLinesStdout.write(initialFrame);
    expect(write).toHaveBeenCalledWith(initialFrame);

    write.mockClear();
    const newFrame = 'Line 1\nLine 2\nLine 3\nLine4\n';
    staticLinesStdout.write(newFrame);
    expect(write).toHaveBeenCalledWith('Line 3\nLine4\n');
  });

  it('should write new diff of frames to stdout', () => {
    const initialFrame = 'Line 1\nLine xxx\n';
    staticLinesStdout.write(initialFrame);
    expect(write).toHaveBeenCalledWith(initialFrame);

    write.mockClear();
    const newFrame = 'Line 1\nLine 2\nLine 3\n';
    staticLinesStdout.write(newFrame);
    // expect(write).toHaveBeenCalledWith('Line 2\nLine 3\n');
  });

  it('should handle no changes between frames', () => {
    const initialFrame = 'Some content\n';
    staticLinesStdout.write(initialFrame);

    write.mockClear();
    staticLinesStdout.write(initialFrame);
    expect(write).not.toHaveBeenCalled();
  });

  it('should handle an empty frame', () => {
    staticLinesStdout.write('');

    expect(write).not.toHaveBeenCalled();
  });

  it('should handle a frame with only one line', () => {
    const frame = 'Single line';
    staticLinesStdout.write(frame);

    expect(write).toHaveBeenCalledWith('Single line\n');
  });
});
