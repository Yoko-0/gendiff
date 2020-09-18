import gendiff from '../src/gendiff.js';

const obj = "{\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: undefined\n- timeout: 50\n+ timeout: 20\n  host: hexlet.io\n}";

test('gendiff', () => {
  expect(gendiff('src/file1.json', 'src/file2.json')).toEqual(obj);
});

test('test', () => {
  expect(1).toBe(1);
});
