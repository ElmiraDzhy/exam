import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field, ErrorMessage } from 'formik';

const FormTextArea = ({
  label, classes, ...rest
}) => (
  <Field {...rest}>
    {(props) => {
      const { field, meta: { touched, error } } = props;
      const {
        container, inputStyle, notValid, warning,
      } = classes;
      return (
        <div className={container}>
          <textarea
            {...field}
            placeholder={label}
            className={classNames(inputStyle, {
              [notValid]: touched && error,
            })}
          />
          <ErrorMessage name={field.name} component="span" className={warning} />
        </div>
      );
    }}
  </Field>
);

FormTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    container: PropTypes.string,
    inputStyle: PropTypes.string,
    notValid: PropTypes.string,
    warning: PropTypes.string,
  }),
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
};

FormTextArea.defaultProps = {
  classes: {
    container: '',
    inputStyle: '',
    notValid: '',
    warning: '',
  },
  field: {},
  meta: {},
};

export default FormTextArea;
