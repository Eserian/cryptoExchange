/* eslint-disable no-alert */
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import * as yup from 'yup';
import { Formik } from 'formik';
import Spinner from './Spinner/Spinner.jsx';
import Header from './Header/Header.jsx';
import Form from './Form/Form.jsx';
import { gatListOfAvailableCurrencies } from '../api/api';

const getOptions = (data) => data.map((item) => (
  { value: item.ticker, label: { ticker: item.ticker, name: item.name }, icon: item.image }
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

const schema = yup.object().shape({
  from: yup.string().required('Select currency!'),
  to: yup.string().required('Select currency!'),
  address: yup.string().required('Address is required'),
});

const App = () => {
  const { isLoading, data } = useQuery('currenciesData', gatListOfAvailableCurrencies);

  const MainContent = () => (
    <>
      <Header />
      <Formik
        initialValues={{
          from: '',
          to: '',
          address: '',
          amountFrom: '',
          amountTo: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form selectOptions={getOptions(data)} />
      </Formik>
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
