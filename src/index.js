import fs from 'fs';
import genDiffByObj from './main.js';

const genDiff = (filePath1, filePath2) => {
  if (!fs.existsSync(filePath1)) {
    console.log(`Access denied '${filePath1}'`);
    return;
  }
  if (!fs.existsSync(filePath2)) {
    console.log(`Access denied '${filePath2}'`);
    return;
  }

  const jsonStr1 = fs.readFileSync(filePath1);
  const jsonStr2 = fs.readFileSync(filePath2);

  try {
    const obj1 = JSON.parse(jsonStr1);
    const obj2 = JSON.parse(jsonStr2);
    console.log(genDiffByObj(obj1, obj2));
  } catch (e) {
    console.log(`Invalid json\n${e}`);
  }
};

export default genDiff;

// console.log(genDiff('src/file1.json', '/mnt/main/Projects/gendiff/src/file2.json'));
