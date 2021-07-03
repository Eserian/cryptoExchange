import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Spinner from './Spinner/Spinner.jsx';
import Header from './Header/Header.jsx';
import Form from './Form/Form.jsx';
import { gatListOfAvailableCurrencies } from '../api/api';

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
  const { isLoading, data } = useQuery('currenciesData', gatListOfAvailableCurrencies);

  return (
    <Container>
      <Content>
        {isLoading
          ? <Spinner />
          : (
            <>
              <Header />
              <Form selectOptions={getOptions(data)} />
            </>
          )
        }
      </Content>
    </Container>
  );
};

export default App;
