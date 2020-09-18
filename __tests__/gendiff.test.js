import genDiff from '../src/main.js';

const resStr = "{\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: undefined\n- timeout: 50\n+ timeout: 20\n  host: hexlet.io\n}";

const obj1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}

const obj2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
test('gendiff', () => {
  expect(genDiff(obj1, obj2)).toEqual(resStr);
});

test('test', () => {
  expect(1).toBe(1);
});
