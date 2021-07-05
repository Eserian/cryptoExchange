export const getPair = (from, to) => `${from}_${to}`;

export const getOptions = (data) => data.map((item) => (
  { value: item.ticker, label: { ticker: item.ticker, name: item.name }, icon: item.image }
));
