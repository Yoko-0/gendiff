import fs from "fs";
import _ from 'lodash';

const getObjByFilePath = (filePath) => {
  const json = fs.readFileSync(filePath, "utf8");
  const obj = JSON.parse(json);
  return obj;
};

const addInMiddle = (array, value) => {
  const start = 1;
  const deleteCount = 0;
  array.splice(start, deleteCount, value);
};

const genDiff = (filePath1, filePath2) => {
  const obj1 = getObjByFilePath(filePath1);
  const obj2 = getObjByFilePath(filePath2);

  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const resultDiff = ['{\n', '}'];

  const unchangedGenStr = keysObj1.filter((key) => _.has(obj2, key) && obj1[key] === obj2[key]).map((key) => `    ${key}: ${obj1[key]}\n`);
  const changedGenStr = keysObj1.filter((key) => _.has(obj2, key) && obj1[key] !== obj2[key]).map((key) => `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`);
  const addedGenStr = keysObj2.filter((key) => !_.has(obj1, key)).map((key) => `  + ${key}: ${obj1[key]}\n`);
  const removedGenStr = keysObj1.filter((key) => !_.has(obj2, key)).map((key) => `  - ${key}: ${obj1[key]}\n`);

  addInMiddle(resultDiff, unchangedGenStr);
  addInMiddle(resultDiff, changedGenStr);
  addInMiddle(resultDiff, addedGenStr);
  addInMiddle(resultDiff, removedGenStr);

  return resultDiff.flat().join('');
}


export default genDiff;

//console.log(genDiff('src/file1.json', '/mnt/main/Projects/gendiff/src/file2.json'));
