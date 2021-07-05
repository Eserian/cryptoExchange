import React, { useEffect, useState, useCallback } from 'react';
import { useFormikContext, ErrorMessage } from 'formik';
import styled, { css } from 'styled-components';
import { debounce, isEmpty } from 'lodash';
import InputWithSelect from '../InputWithSelect/InputWithSelect.jsx';
import Button from '../Button/Button.jsx';
import AddressInput from '../AddressInput/AddressInput.jsx';
import { ReactComponent as SwapIcon } from '../../../../images/swap.svg';
import getPair from '../../../../utils/getPair';

const Swap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
`;

const InputsRow = styled.div`
  display: flex;
`;

const BottomRow = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
`;

const Error = styled.div`
  width: 100%;
  margin-top: 10px;
  font-size: 16px;
  line-height: 23px;
  color: #E03F3F;
  ${(props) => props.side && css`
    text-align: ${props.side};
  `}
`;

const Errors = styled.div`
  display: flex;
`;

const Form = ({ selectOptions, getMinimalExchangeAmount, getEstimatedExchangeAmount }) => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
  } = useFormikContext();
  const [minimalEchangeAmount, setMinimalExchangeAmount] = useState(0);
  const [error, setError] = useState(null);

  const debouncedGetEstimatedExchangeAmount = useCallback(
    debounce(async (amount, pair) => {
      try {
        const { estimatedAmount } = await getEstimatedExchangeAmount(amount, pair);
        setFieldValue('amountTo', estimatedAmount);
      } catch (e) {
        if (e.response.data.error === 'pair_is_inactive') {
          setError('This pair is disabled now');
        } else {
          setError(e.response.data.message);
        }
      }
    }, 500),
    [],
  );

  useEffect(() => {
    (async () => {
      if (!values.from || !values.to) {
        return;
      }
      try {
        const pair = getPair(values.from, values.to);
        const { minAmount } = await getMinimalExchangeAmount(pair);
        setMinimalExchangeAmount(minAmount);
        setFieldValue('amountFrom', minAmount);
      } catch (e) {
        if (e.response.data.error === 'pair_is_inactive') {
          setError('This pair is disabled now');
        } else {
          setError(e.response.data.message);
        }
      }
    })();
  }, [values.from, values.to]);

  useEffect(() => {
    (async () => {
      if (!values.amountFrom) {
        return;
      }
      if (values.amountFrom < minimalEchangeAmount) {
        setFieldValue('amountTo', '-');
        setError('Amount is less than minimum');
        return;
      }
      setError(null);
      const pair = getPair(values.from, values.to);
      await debouncedGetEstimatedExchangeAmount(values.amountFrom, pair);
    })();
  }, [values.amountFrom]);

  return (
    <form onSubmit={handleSubmit}>
      <InputsRow>
        <InputWithSelect options={selectOptions} type='from' />
        <Swap>
          <SwapIcon />
        </Swap>
        <InputWithSelect options={selectOptions} type='to' />
      </InputsRow>
      <Errors>
        <ErrorMessage component={Error} name='from' side='left' />
        <ErrorMessage component={Error} name='to' side='right' />
      </Errors>
      <BottomRow>
        <AddressInput />
        <Button type='submit' disabled={error || !isEmpty(errors)}>Exchange</Button>
      </BottomRow>
      <Errors>
        <ErrorMessage component={Error} side='left' name='address' />
        {error && (
          <Error side='right'>
            {error && error}
          </Error>
        )}
      </Errors>
    </form>
  );
};

export default Form;
