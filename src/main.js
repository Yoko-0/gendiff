import _ from 'lodash';

const speialSort = (str1, str2) => {
  if (str1 === str2) return 0;
  return str1.slice(4) > str2.slice(4) ? 1 : -1;
}

const genDiff = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const unchangedGenStr = keysObj1.filter((key) => _.has(obj2, key) && obj1[key] === obj2[key]).map((key) => `    ${key}: ${obj1[key]}\n`);
  const changedGenStr = keysObj1.filter((key) => _.has(obj2, key) && obj1[key] !== obj2[key]).map((key) => `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`);
  const addedGenStr = keysObj2.filter((key) => !_.has(obj1, key)).map((key) => `  + ${key}: ${obj2[key]}\n`);
  const removedGenStr = keysObj1.filter((key) => !_.has(obj2, key)).map((key) => `  - ${key}: ${obj1[key]}\n`);

  return `{\n${[unchangedGenStr, changedGenStr, addedGenStr, removedGenStr].flat().sort(speialSort).join('')}}`;
};

export default genDiff;
