import multiply from './multiply';

test('multiplies two numbers', () => {
  expect(multiply(2, 10)).toBe(20);
}).withMetaData({
  tags: ['math']
});
