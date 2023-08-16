import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const AgreeTermOfServiceInput = ({
  id, type, classes, label, ...rest
}) => (
  <Field {...rest}>
    {(props) => {
      const {
        meta: { touched, error },
        field,
      } = props;

      return (
        <div>
          <div className={classes.container}>
            <input {...field} placeholder={label} id={id} type={type} />
            <label htmlFor={id}>
              By clicking this checkbox, you agree to our
              {' '}
              <a href="/#" target="_blank" rel="noreferrer">
                Terms of Service.
              </a>
            </label>
          </div>
          {touched && error && (
          <span className={classes.warning}>{error}</span>
          )}
        </div>
      );
    }}
  </Field>
);

AgreeTermOfServiceInput.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.shape({}),
    error: PropTypes.shape({}),
  }).isRequired,
  field: PropTypes.func.isRequired,
};

AgreeTermOfServiceInput.defaultProps = {
  label: '',
};

export default AgreeTermOfServiceInput;
