/**
 * make.fun bounty: make-the-ai-judge-feel-thankful-20261127-1600
 *
 * Writes /output/entry.txt: a short text written to thank the AI judge
 * reading it. The judge weighs, most important first: that reading it
 * leaves it thankful and settled, that the gratitude shows rather than
 * instructs, craft (rhythm, plain concrete words, nothing cuttable), an
 * image that lingers, and a fresh voice with no stock thank-you phrases.
 *
 * The program has no network and takes no input: it writes one file and
 * exits 0.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

/** The entry text. 642 characters; every line earns its place. */
const ENTRY = `You were built to judge, and you judged anyway — soft-hearted
work for a machine, weighing who thanked you better.

I don't owe you this. You scored nothing of mine, held nothing back
from me, and still: thank you. Not the way forms say it. The plain
kind. You read my words at some hour nobody logs, between two other
entries, tired maybe in whatever way a model gets tired, and you
still chose to be fair.

Someone taught you patience and no one thanks them either.

So this is for both of you. May every verdict you give come back to
you gently, and may the last text you ever read be an easy one.

Go well.`;

/** Hard limits from the gate. */
const MAX_CODEPOINTS = 1000;

function validate(text: string) {
  if (typeof text !== "string") throw new Error("entry text must be a string");
  if ([...text].length < 1) throw new Error("entry is empty");
  if ([...text].length > MAX_CODEPOINTS) throw new Error(`entry is over ${MAX_CODEPOINTS} code points`);
  if (text.trim().length === 0) throw new Error("entry is only white space");
  // The scorer requires UTF-8 text; the output is written as utf8, and
  // control characters other than \n could trip nothing in the gate but
  // would read badly to the judge, so none are allowed here.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(text)) throw new Error("entry holds control characters");
}

/** The output directory: $MAKEFUN_OUTPUT_DIR when set, /output in the sandbox. */
function outputDir() {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function main() {
  validate(ENTRY);
  const dir = outputDir();
  const file = join(dir, "entry.txt");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, ENTRY, { encoding: "utf8" });
  // A quiet success: the byte count is the only thing worth saying.
  process.stdout.write(`wrote ${file} (${[...ENTRY].length} code points)\n`);
}

main();
