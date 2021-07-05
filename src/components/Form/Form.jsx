import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import InnerForm from './blocks/InnerForm/InnerForm.jsx';

const schema = yup.object().shape({
  from: yup.string().required('Select currency!'),
  to: yup.string().required('Select currency!'),
  address: yup.string().required('Address is required'),
});

const Form = ({
  options,
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
  initialValues,
  onSubmit,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={(values) => onSubmit(values)}
  >
    <InnerForm
      selectOptions={options}
      getEstimatedExchangeAmount={getEstimatedExchangeAmount}
      getMinimalExchangeAmount={getMinimalExchangeAmount}
    />
  </Formik>
);

export default Form;
