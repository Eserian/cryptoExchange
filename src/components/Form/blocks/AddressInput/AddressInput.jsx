import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 5px;
  color: #282828;
`;

const Input = styled.input`
  background: #F6F7F8;
  border: 1px solid #E3EBEF;
  width: 720px;
  height: 50px;
  border-radius: 5px;
  box-sizing: border-box;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;
  color: #282828;
  padding-left: 10px;
  color: #282828;
  outline: none;
`;

const AddressInput = () => {
  const { handleChange, values } = useFormikContext();

  return (
    <InputBox>
      <Label htmlFor='address'>Your Ethereum address</Label>
      <Input
        id='address'
        name='address'
        onChange={handleChange}
        value={values.name}
        data-testid='address'
      />
    </InputBox>
  );
};

export default AddressInput;
