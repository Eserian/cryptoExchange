import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Header from './Header/Header.jsx';
import Form from './Form/Form.jsx';
import { gatListOfAvailableCurrencies } from '../api/api';

/*
const testData = [
  {
    ticker: 'btc',
    name: 'Bitcoin',
    image: 'https://changenow.io/images/coins/btc.svg',
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
  },
  {
    ticker: 'eth',
    name: 'Ethereum',
    image: 'https://changenow.io/images/coins/eth.svg',
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true,
  },
  {
    ticker: 'xrp',
    name: 'Ripple',
    image: 'https://changenow.io/images/coins/xrp.svg',
    hasExternalId: true,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true,
  },
];
*/

const getOptions = (data) => data.map((item) => (
  { value: item, label: { ticker: item.ticker, name: item.name }, icon: item.image }
));

const Container = styled.div`
  font-family: Arial;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: cneter;
`;

const Content = styled.div`
  margin: 0 auto;
`;

const App = () => {
  const { isLoading, data } = useQuery('repoData', gatListOfAvailableCurrencies);

  return isLoading
    ? 'Loading'
    : (
      <Container>
        <Content>
          <Header />
          <Form options={getOptions(data)} />
        </Content>
      </Container>
    );
};

export default App;
