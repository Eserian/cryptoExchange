import { getPair, getOptions } from '../utils/utils';

test('shouldGetPair', () => {
  expect(getPair('foo', 'bar')).toEqual('foo_bar');
});

test('shouldGetOptions', () => {
  const testData = [{
    ticker: 'btc',
    name: 'Bitcoin',
    image: 'https://changenow.io/images/coins/btc.svg',
  },
  {
    ticker: 'eth',
    name: 'Ethereum',
    image: 'https://changenow.io/images/coins/eth.svg',
  }];

  const expectResult = [
    { value: 'btc', label: { ticker: 'btc', name: 'Bitcoin' }, icon: 'https://changenow.io/images/coins/btc.svg' },
    { value: 'eth', label: { ticker: 'eth', name: 'Ethereum' }, icon: 'https://changenow.io/images/coins/eth.svg' },
  ];

  expect(getOptions(testData)).toEqual(expectResult);
});
