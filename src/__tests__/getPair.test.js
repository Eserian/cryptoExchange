import getPair from '../utils/getPair';

test('shouldGetPair', () => {
  expect(getPair('foo', 'bar')).toEqual('foo_bar');
});
