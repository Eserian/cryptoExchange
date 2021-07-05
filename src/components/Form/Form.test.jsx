/* eslint-disable react/display-name */
import React from 'react';
import axios from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form.jsx';

const server = setupServer(
  rest.get('/min-amount/', (req, res, ctx) => res(ctx.json({ minAmount: 0.002645 }))),
  rest.get('/exchange-amount/', (req, res, ctx) => res(ctx.json({ estimatedAmount: 58.4142873 }))),
  rest.get('/invalid-pair/', (req, res, ctx) => res(ctx.status(400), ctx.json({ error: '', message: 'Exchanges btc->btc is not supported' }))),
);

const getMinimalExchangeAmount = async () => {
  const url = '/min-amount/';
  const { data } = await axios(url);
  return data;
};

const getEstimatedExchangeAmount = async () => {
  const url = '/exchange-amount/';
  const { data } = await axios(url);
  return data;
};

const getError = async () => {
  const url = '/invalid-pair/';
  const response = await axios(url);
  return response;
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render right values', async () => {
  render(
    <Form
      initialValues={{
        from: 'btc',
        to: 'eth',
        address: '',
        amountFrom: '',
        amountTo: '',
      }}
      selectOptions={jest.fn}
      getEstimatedExchangeAmount={getEstimatedExchangeAmount}
      getMinimalExchangeAmount={getMinimalExchangeAmount}
    />,
  );
  await waitFor(() => expect(screen.getByTestId('amountFrom')).toHaveValue('0.002645'));
  await waitFor(() => expect(screen.getByTestId('amountTo')).toHaveValue('58.4142873'));
});

test('render error', async () => {
  render(
    <Form
      initialValues={{
        from: '',
        to: '',
        address: '',
        amountFrom: '',
        amountTo: '',
      }}
      selectOptions={jest.fn}
      getEstimatedExchangeAmount={getEstimatedExchangeAmount}
      getMinimalExchangeAmount={getMinimalExchangeAmount}
    />,
  );

  fireEvent.click(screen.getByText('Exchange'));
  await waitFor(() => expect(screen.getByText('Exchange')).toBeDisabled());
  await waitFor(() => expect(screen.getByText('Address is required')).toBeInTheDocument());
});

test('invalid pair error', async () => {
  render(
    <Form
      initialValues={{
        from: 'btc',
        to: 'btc',
        address: '',
        amountFrom: '',
        amountTo: '',
      }}
      selectOptions={jest.fn}
      getEstimatedExchangeAmount={getEstimatedExchangeAmount}
      getMinimalExchangeAmount={getError}
    />,
  );

  await waitFor(() => expect(screen.getByText('Exchanges btc->btc is not supported')).toBeInTheDocument());
});

test('less then minimum error', async () => {
  render(
    <Form
      initialValues={{
        from: 'btc',
        to: 'eth',
        address: '',
        amountFrom: '',
        amountTo: '',
      }}
      selectOptions={jest.fn}
      getEstimatedExchangeAmount={getEstimatedExchangeAmount}
      getMinimalExchangeAmount={getMinimalExchangeAmount}
    />,
  );

  await waitFor(() => expect(screen.getByTestId('amountFrom')).toHaveValue('0.002645'));
  await waitFor(() => expect(screen.getByTestId('amountTo')).toHaveValue('58.4142873'));

  fireEvent.change(screen.getByTestId('amountFrom'), { target: { value: '0.002' } });

  await waitFor(() => expect(screen.getByTestId('amountTo')).toHaveValue('-'));
  await waitFor(() => expect(screen.getByText('Amount is less than minimum')).toBeInTheDocument());
});

test('submit correctly', async () => {
  const handleSubmit = jest.fn();
  render(
    <Form
      initialValues={{
        from: 'btc',
        to: 'eth',
        address: '',
        amountFrom: '',
        amountTo: '',
      }}
      selectOptions={jest.fn}
      getEstimatedExchangeAmount={getEstimatedExchangeAmount}
      getMinimalExchangeAmount={getMinimalExchangeAmount}
      onSubmit={handleSubmit}
    />,
  );
  await waitFor(() => expect(screen.getByTestId('amountFrom')).toHaveValue('0.002645'));
  await waitFor(() => expect(screen.getByTestId('amountTo')).toHaveValue('58.4142873'));

  fireEvent.change(screen.getByTestId('address'), { target: { value: 'test address' } });
  await waitFor(() => expect(screen.getByTestId('amountFrom')).toHaveValue('0.002645'));

  fireEvent.click(screen.getByText('Exchange'));
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
    from: 'btc',
    to: 'eth',
    address: 'test address',
    amountFrom: 0.002645,
    amountTo: 58.4142873,
  }));
});
