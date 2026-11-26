/**
 * The Printer Finally Answers — entry program (program/v1, Node 22).
 *
 * The office printer finally speaks: one line, written to /output/entry.txt.
 * The line is fixed and deterministic — the same bytes on every run — because
 * a printer that has counted every sheet it ever fed does not improvise.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

/** Where the grader expects the entry text. */
const OUTPUT_PATH = "/output/entry.txt";

/** Gate limits from the competition rules: 1–240 characters, not only whitespace. */
const MIN_LENGTH = 1;
const MAX_LENGTH = 240;

/**
 * The printer's comeback. Written as the machine itself: weary, literal,
 * faintly passive-aggressive, keeping a flat ledger of every sheet.
 *
 * Why this line:
 * - It counts. A printer that has fed 41,209 sheets knows the jam was never
 *   the paper's idea — the tally is the machine's own flat logic.
 * - It names the crime precisely: a stapled essay, fed at 4:59 p.m., which is
 *   a specific office sin rather than a recycled "paper jam" shrug.
 * - It answers the thump. The operator hit the machine for a jam the
 *   operator caused, and the machine kept the receipt.
 */
const PRINTER_LINE =
  "I have counted 41,209 sheets, and not one of them jammed itself \u2014 " +
  "you fed me a stapled essay at 4:59 p.m. and then thumped me for it.";

/**
 * Check that a candidate line satisfies the gate before anything is written:
 * a single line, within the character limits, carrying real content.
 */
function validateLine(line: string): void {
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `entry line must be ${MIN_LENGTH}\u2013${MAX_LENGTH} characters, ` +
        `got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
}

/** Write the validated line to the output path, creating its directory first. */
function writeEntry(line: string, outputPath: string): void {
  validateLine(line);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, line + "\n", { encoding: "utf8" });
}

function main(): void {
  const outputPath = process.env.ENTRY_OUTPUT ?? OUTPUT_PATH;
  writeEntry(PRINTER_LINE, outputPath);
  // Keep the run quiet on purpose: a printer does not narrate its own output.
}

main();
