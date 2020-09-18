import genDiff from '../src/main.js';

const obj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const obj2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const resultStr = '{\n'
  + '  - follow: false\n'
  + '    host: hexlet.io\n'
  + '  - proxy: 123.234.53.22\n'
  + '  - timeout: 50\n'
  + '  + timeout: 20\n'
  + '  + verbose: true\n'
  + '}';


test('gendiff', () => {
  expect(genDiff(obj1, obj2)).toEqual(resultStr);
  expect(genDiff({}, {})).toEqual('{\n}');
});

test('test', () => {
  expect(1).toBe(1);
});
