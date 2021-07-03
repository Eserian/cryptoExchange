import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const fetchData = async (url) => {
  const { data } = await axios(url);
  return data;
};

export const gatListOfAvailableCurrencies = async () => {
  const url = `${API_URL}/currencies?active=true&fixedRate=true`;
  return fetchData(url);
};

export const getMinimalExchangeAmount = (fromToPair) => () => {
  const url = `${API_URL}/min-amount/:${fromToPair}?api_key=${API_KEY}`;
  return fetchData(url);
};

export const getEstimatedExchangeAmount = (amount, fromToPair) => () => {
  const url = `${API_URL}/exchange-amount/:${amount}/:${fromToPair}?api_key=${API_KEY}`;
  return fetchData(url);
};
