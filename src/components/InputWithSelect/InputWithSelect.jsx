/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
  flex-grow: 3;
  background: #F4F4F4;
  border: none;
  outline:none;
  box-sizing: border-box;
  ${(props) => props.isHide && css`
    display: none;
  `}
`;

const InputWithSelect = (props) => {
  const [isInputHide, setIsInputHide] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsInputHide(true);
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsInputHide(false);
    setIsMenuOpen(false);
  };

  return (
    <InputGroup isMenuOpen={isMenuOpen}>
      <Input {...props} isHide={isInputHide} />
      <Separator isHide={isInputHide} />
      <Select
        {...props}
        options={props.options}
        onMenuOpen={handleOpenMenu}
        onMenuClose={handleCloseMenu}
      />
    </InputGroup>
  );
};

export default InputWithSelect;
