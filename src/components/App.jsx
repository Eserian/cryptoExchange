import React from 'react';
import styled from 'styled-components';
import Header from './Header/Header.jsx';
import Form from './Form/Form.jsx';

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

const options = testData.map((item) => (
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

const App = () => (
  <Container>
    <Content>
      <Header />
      <Form options={options} />
    </Content>
  </Container>
);

export default App;
