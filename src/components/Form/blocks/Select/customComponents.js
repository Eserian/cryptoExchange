/* eslint-disable react/prop-types */
import React from 'react';
import { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styled, { css } from 'styled-components';

const OptionItemBox = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.span`
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 8px;
  ${(props) => css`
    background-image: url(${props.src});
  `}
`;

const Name = styled.span`
  margin-left: 10px;
  color: #80A2B6;
  font-size: 16px;
  line-height: 23px;
`;

const Ticker = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;
  ${(props) => props.data.length > 4 && css`
    font-size: 10px;
  `}
`;

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
`;

const { Option, SingleValue, DropdownIndicator } = components;

export const CustomDropdownIndicator = (props) => (
  <DropdownIndicator {...props}>
    <FontAwesomeIcon icon={props.selectProps.menuIsOpen ? faTimes : faAngleDown}/>
  </DropdownIndicator>
);

export const CustomOption = (props) => (
  <Option {...props}>
    <OptionItemBox>
      <Image src={props.data.icon} />
      <span>
        {props.data.label.ticker.toUpperCase()}
      </span>
      <Name>
        {props.data.label.name}
      </Name>
    </OptionItemBox>
  </Option>
);

export const CustomSingleValue = (props) => (
  <SingleValue {...props}>
    {props.selectProps.menuIsOpen
      ? props.selectProps.placeholder
      : (
        <SelectedItem>
          <Image src={props.data.icon} />
          <Ticker data={props.data.label.ticker}>
            {props.data.label.ticker.toUpperCase()}
          </Ticker>
        </SelectedItem>
      )
    }
  </SingleValue>
);
