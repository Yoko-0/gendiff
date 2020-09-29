import genDiff from '../src/main.js';
import main from '../src/index.js';

const obj1 = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": ["value", "asd"],
      "doge": {
        "wow": "too much"
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": [45, 56]
    }
  }
};


const obj2 = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": 100500,
    "deep": {
      "id": {
        "number": 45
      }
    }
  }
};

const resultStr = '{\n'
  + '    common: {\n'
  + '      + follow: false\n'
  + '        setting1: Value 1\n'
  + '      - setting2: 200\n'
  + '      - setting3: true\n'
  + '      + setting3: {\n'
  + '            key: value\n'
  + '        }\n'
  + '      + setting4: blah blah\n'
  + '      + setting5: {\n'
  + '            key5: value5\n'
  + '        }\n'
  + '        setting6: {\n'
  + '            doge: {\n'
  + '              - wow: too much\n'
  + '              + wow: so much\n'
  + '            }\n'
  + '          - key: [value,asd]\n'
  + '          + key: value\n'
  + '          + ops: vops\n'
  + '        }\n'
  + '    }\n'
  + '    group1: {\n'
  + '      - baz: bas\n'
  + '      + baz: bars\n'
  + '        foo: bar\n'
  + '      - nest: {\n'
  + '            key: value\n'
  + '        }\n'
  + '      + nest: str\n'
  + '    }\n'
  + '  - group2: {\n'
  + '        abc: 12345\n'
  + '        deep: {\n'
  + '            id: [45,56]\n'
  + '        }\n'
  + '    }\n'
  + '  + group3: {\n'
  + '        fee: 100500\n'
  + '        deep: {\n'
  + '            id: {\n'
  + '                number: 45\n'
  + '            }\n'
  + '        }\n'
  + '    }\n'
  + '}';

test('gendiff', () => {
  expect(genDiff(obj1, obj2)).toEqual(resultStr);
  expect(genDiff({}, {})).toEqual('{\n}');
});

test('gendiff', () => {
  expect(main('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(resultStr);
});
