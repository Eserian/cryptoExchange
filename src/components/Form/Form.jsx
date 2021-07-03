/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import InputWithSelect from '../InputWithSelect/InputWithSelect.jsx';
import Button from '../Button/Button.jsx';
import AddressInput from '../AddressInput/AddressInput.jsx';
import { ReactComponent as SwapIcon } from '../../images/swap.svg';

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

const Form = ({ options }) => (
  <form>
    <InputsRow>
      <InputWithSelect options={options} />
      <Swap>
        <SwapIcon />
      </Swap>
      <InputWithSelect options={options} />
    </InputsRow>
    <BottomRow>
      <AddressInput />
      <Button>Exchange</Button>
    </BottomRow>
  </form>
);

export default Form;
