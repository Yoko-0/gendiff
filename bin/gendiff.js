#!/usr/bin/env node
import program from "commander";
import genDiff from "../src/index.js";


program
  .version('0.0.1')
  .helpOption('-h, --help', 'output usage information')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format') 
  .arguments('<filePath1> <filePath2>')

program
  .action(genDiff)

program.parse(process.argv);
