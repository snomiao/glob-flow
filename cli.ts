#!/usr/bin/env bun

import { file } from "bun";
import { sf } from "sflow";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import globFlow from ".";

await yargs(hideBin(process.argv))
  .command(
    // "$0 <...globs>",
    ["scan [globs..]", "$0 [globs..]"],
    "Glob scan current dir",
    (v) =>
      v
        .positional("globs", {
          describe: "globs to scan",
          type: "string",
          default: ["./**/*"],
          coerce: (arg: string | string[]) =>
            Array.isArray(arg) ? arg : [arg],
        })
        .boolean("md")
        .describe("md", "Read contents and combine into code-prompt style md")
        // .default("md", true)
        .string("message")
        .alias("m", "message")
        .describe(
          "m",
          "Suffix message of output md, you can put prompt-message here for LLM"
        ),
    async (argv) => {
      const arg = argv.globs;
      const globs = [arg[0] ?? "./**/*", ...arg.slice(1)];
      return await globFlow(globs)
        .by((r) =>
          argv.md || argv.m
            ? r
                .map(
                  async (f) =>
                    `## ${f}\n\n${"```\n"}${await file(f).text()}${"\n```"}`
                )
                .concat(...(!argv.m ? [] : [sf([argv.m])]))
                .join("\n")
            : r
        )
        .toLog();
    }
  )
  .help()
  .alias("h", "help")
  .version()
  .alias("v", "version")
  .demandCommand(1)
  .parse();
