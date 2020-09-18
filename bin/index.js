#!/usr/bin/env node
import program from "commander";
import genDiff from "../gendiff.js";


program
  .version('0.0.1')
  .helpOption('-h, --help', 'output usage information')
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>');

program
  .option('-f, --format [type]', 'output format')

program.parse(process.argv);


const [, , filePath1, filePath2] = process.argv;

const diff = genDiff(filePath1, filePath2);

console.log(diff);
