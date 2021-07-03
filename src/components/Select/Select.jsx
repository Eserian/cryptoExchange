import React from 'react';
import ReactSelect from 'react-select';
import customStyles from './customStyles';
import { CustomOption, CustomDropdownIndicator, CustomSingleValue } from './customComponents';

const Select = (props) => (
  <ReactSelect
    {...props}
    styles={customStyles}
    placeholder="Search"
    components={{
      Option: CustomOption,
      SingleValue: CustomSingleValue,
      DropdownIndicator: CustomDropdownIndicator,
    }}
    maxMenuHeight={160}
  />
);

export default Select;
