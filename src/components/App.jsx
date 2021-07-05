import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Spinner from './Spinner/Spinner.jsx';
import Header from './Header/Header.jsx';
import Form from './Form/Form.jsx';
import { gatListOfAvailableCurrencies, getMinimalExchangeAmount, getEstimatedExchangeAmount } from '../api/api';
import { getOptions } from '../utils/utils';

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
  const { isLoading, data } = useQuery('currenciesData', gatListOfAvailableCurrencies);

  const MainContent = () => (
    <>
      <Header />
      <Form
        initialValues={{
          from: '',
          to: '',
          address: '',
          amountFrom: '',
          amountTo: '',
        }}
        options={getOptions(data)}
        getEstimatedExchangeAmount={getEstimatedExchangeAmount}
        getMinimalExchangeAmount={getMinimalExchangeAmount}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      />
    </>
  );

  return (
    <Container>
      <Content>
        {isLoading ? <Spinner /> : <MainContent />}
      </Content>
    </Container>
  );
};

export default App;
