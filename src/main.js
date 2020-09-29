import _ from 'lodash';

const isArray = (obj) => {
  return Array.isArray(obj);
}

const isObj = (obj) => {
  return typeof(obj) === "object" && !isArray(obj);
}

const printAllObj = (obj, counter) => {
  const keys = Object.keys(obj);
  const lenTab = 4;
  const space = ' '.repeat(counter + lenTab);

  return keys.map((key) => {
    if (isArray(obj[key])) {
      return [`${space}${key}: [${obj[key]}]`];
    }

    if (isObj(obj[key])){
      return [`${space}${key}: {\n${printAllObj(obj[key], counter + lenTab)}\n${space}}`];
    }

    return [`${space}${key}: ${obj[key]}`];
  }).join('\n');
};


const genDiff = (obj1, obj2) => {

  const lenTab = 2;
  const specTab = 2;

  const iter = (obj1, obj2, counter) => {

    const keysObj1 = Object.keys(obj1);
    const keysObj2 = Object.keys(obj2);
    const keys = _.union(keysObj1, keysObj2).sort();
    const spaceStart = ' '.repeat(counter);
    const spaceEnd = ' '.repeat(counter + lenTab);

    const res = keys.flatMap((key) => {

      const isInObj1 = keysObj1.includes(key);
      const isInObj2 = keysObj2.includes(key);
      const isObj1 = isObj(obj1[key]);
      const isObj2 = isObj(obj2[key]);
      const isArray1 = isArray(obj1[key]);
      const isArray2 = isArray(obj2[key]);

      const removed = isInObj1 && !isInObj2;
      const added = !isInObj1 && isInObj2;
      const modified = isInObj1 && isInObj2 && obj1[key] !== obj2[key];

      if (isObj1 && isObj2) {
        if (removed){
          return [`${spaceStart}- ${key}: {\n${printAllObj(obj1[key], counter + lenTab + specTab)}\n${spaceEnd}}`];
        }
        if (added){
          return [`${spaceStart}+ ${key}: {\n${printAllObj(obj2[key], counter + lenTab + specTab)}\n${spaceEnd}}`];
        }
        return [`${spaceStart}  ${key}: {\n${iter(obj1[key], obj2[key], counter + lenTab + specTab)}\n${spaceEnd}}`];
      }

      const removedObj = isObj1 ? `${spaceStart}- ${key}: {\n${printAllObj(obj1[key], counter + lenTab)}\n${spaceEnd}}` :
                                  `${spaceStart}- ${key}: ${obj1[key]}`;
      const addedObj = isObj2 ? `${spaceStart}+ ${key}: {\n${printAllObj(obj2[key], counter + lenTab)}\n${spaceEnd}}` :
                                `${spaceStart}+ ${key}: ${obj2[key]}`;
      const unmodifiedObj = isObj1 ? `${spaceStart}  ${key}: {\n${printAllObj(obj1[key], counter + lenTab)}\n${spaceEnd}}` :
                                     `${spaceStart}  ${key}: ${obj1[key]}`;


      const removedStr = isArray1 ? `${spaceStart}- ${key}: [${obj1[key]}]` :
                                   removedObj;
      const addedStr = isArray2 ? `${spaceStart}+ ${key}: [${obj2[key]}]` :
                                 addedObj;
      const unmodifiedStr = isArray1 ? `${spaceStart}  ${key}: [${obj1[key]}]` :
                                      unmodifiedObj;

      if (removed) {
        return [removedStr];
      }
      if (added){
        return [addedStr];
      }
      if (modified) {
        return [removedStr, addedStr];
      }
      return [unmodifiedStr];

    });
    return res.join('\n');
  }

  const res = iter(obj1, obj2, 2);

  return res === '' ? `{\n}` : `{\n${res}\n}`;
};

export default genDiff;
