import React from 'react';
import styled from 'styled-components';

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
`;

const AddressInput = (props) => (
  <InputBox>
    <Label>Your Ethereum address</Label>
    <Input {...props}/>
  </InputBox>
);

export default AddressInput;
