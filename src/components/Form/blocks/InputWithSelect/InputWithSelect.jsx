/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import styled, { css } from 'styled-components';
import Select from '../Select/Select.jsx';

const InputGroup = styled.div`
  display: flex;
  flex-grow: 1;
  box-sizing: border-box;
  background: #F4F4F4;
  border: 1px solid #E3EBEF;
  border-radius: 5px;
  width: 400px;

  ${(props) => props.isMenuOpen && css`
    border-top: 1px solid #C1D9E6;
    border-left: 1px solid #C1D9E6;
    border-right: 1px solid #C1D9E6;
    border-radius: 5px 5px 0 0;
  `}
`;

const Separator = styled.span`
  align-self: stretch;
  background-color: #E3EBEF;
  margin-bottom: 8px;
  margin-top: 8px;
  width: 1px;
  box-sizing: border-box;
  ${(props) => props.isHide && css`
    display: none;
  `}
`;

const Input = styled.input`
  flex-grow: 1.5;
  background: #F4F4F4;
  border: none;
  outline:none;
  box-sizing: border-box;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;
  color: #282828;
  padding-left: 10px;
  ${(props) => props.isHide && css`
    display: none;
  `}
`;

const InputWithSelect = ({ options, type }) => {
  const { setFieldValue, handleChange, values } = useFormikContext();
  const [isInputHide, setIsInputHide] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectChange = ({ value }) => {
    setFieldValue(type, value);
  };

  const handleOpenMenu = () => {
    setIsInputHide(true);
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsInputHide(false);
    setIsMenuOpen(false);
  };

  const isDisabledInput = type === 'from' && ((!values.from || !values.to) || (values.from === values.to));
  const isReadOnlyInput = type === 'to';
  const inputName = type === 'from' ? 'amountFrom' : 'amountTo';
  const inputValue = type === 'from' ? values.amountFrom : values.amountTo;

  return (
    <InputGroup isMenuOpen={isMenuOpen}>
      <Input
        isHide={isInputHide}
        disabled={isDisabledInput}
        readOnly={isReadOnlyInput}
        onChange={handleChange}
        name={inputName}
        value={inputValue}
      />
      <Separator isHide={isInputHide} />
      <Select
        onChange={handleSelectChange}
        options={options}
        onMenuOpen={handleOpenMenu}
        onMenuClose={handleCloseMenu}
        isMenuOpen={isMenuOpen}
      />
    </InputGroup>
  );
};

export default InputWithSelect;
