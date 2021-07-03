import getPair from '../utils/getPair';

it('shouldGetPair', () => {
  expect(getPair('foo', 'bar')).toEqual('foo_bar');
});
