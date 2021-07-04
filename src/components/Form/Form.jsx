/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { useFormikContext } from 'formik';
import styled from 'styled-components';
import { debounce } from 'lodash';
import InputWithSelect from './blocks/InputWithSelect/InputWithSelect.jsx';
import Button from './blocks/Button/Button.jsx';
import AddressInput from './blocks/AddressInput/AddressInput.jsx';
import { ReactComponent as SwapIcon } from '../../images/swap.svg';
import { getMinimalExchangeAmount, getEstimatedExchangeAmount } from '../../api/api';
import getPair from '../../utils/getPair';

const Swap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
`;

const InputsRow = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Form = ({ selectOptions }) => {
  const { handleSubmit, values, setFieldValue } = useFormikContext();
  const [minimalEchangeAmount, setMinimalExchangeAmount] = useState(0);

  useEffect(() => {
    (async () => {
      if (!values.from || !values.to) {
        return;
      }

      const pair = getPair(values.from, values.to);
      const { minAmount } = await getMinimalExchangeAmount(pair);
      setMinimalExchangeAmount(minAmount);
      setFieldValue('amountFrom', minAmount);
    })();
  }, [values.from, values.to]);

  const debouncedGetEstimatedExchangeAmount = useCallback(
    debounce(async (amount, pair) => {
      const { estimatedAmount } = await getEstimatedExchangeAmount(amount, pair);
      setFieldValue('amountTo', estimatedAmount);
    }, 1000),
    [],
  );

  useEffect(() => {
    (async () => {
      if (!values.amountFrom) {
        return;
      }
      if (values.amountFrom < minimalEchangeAmount) {
        setFieldValue('amountTo', '-');
        return;
      }

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
      <BottomRow>
        <AddressInput />
        <Button type='submit'>Exchange</Button>
      </BottomRow>
    </form>
  );
};

export default Form;
