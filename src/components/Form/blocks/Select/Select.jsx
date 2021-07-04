/* eslint-disable react/prop-types */
import React from 'react';
import ReactSelect from 'react-select';
import customStyles from './customStyles';
import { CustomOption, CustomDropdownIndicator, CustomSingleValue } from './customComponents';

const Select = (props) => (
  <ReactSelect
    {...props}
    styles={customStyles}
    placeholder={props.isMenuOpen ? 'Search' : 'Select'}
    components={{
      Option: CustomOption,
      SingleValue: CustomSingleValue,
      DropdownIndicator: CustomDropdownIndicator,
    }}
    maxMenuHeight={160}
    isSearchable
  />
);

export default Select;
