'use strict';

/**
 * Guard against stack exhaustion from deep/cyclic brace ASTs (GHSA-vfj7-8cjw-p6xm).
 * Backport of micromatch/braces#88 depth bounds; published braces still tops out at 3.0.3.
 */
module.exports = ast => {
  const pending = [[ast, 0, false]];
  const seen = new WeakSet();
  while (pending.length) {
    const [node, depth, exit] = pending.pop();
    if (exit) {
      seen.delete(node);
      continue;
    }
    if (depth > 128) {
      throw new SyntaxError('Brace AST exceeds safe depth of 128');
    }
    if (seen.has(node)) {
      throw new SyntaxError('Brace AST must be an acyclic tree');
    }
    seen.add(node);
    pending.push([node, depth, true]);
    if (node.nodes) {
      for (const child of node.nodes) {
        pending.push([child, depth + 1, false]);
      }
    }
  }
};
