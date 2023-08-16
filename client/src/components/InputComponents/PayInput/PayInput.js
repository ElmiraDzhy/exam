import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

const PayInput = (props) => {
  const {
    label, changeFocus, classes, isInputMask, mask, name,
  } = props;

  const [field, meta] = useField(name);
  const { touched, error } = meta;

  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input
          {...field}
          placeholder={label}
          className={classNames(classes.input, { [classes.notValid]: touched && error })}
        />
        {(touched && error) && (
        <span className={classes.error}>
          {error.message}
          !
        </span>
        )}
      </div>
    );
  } if (isInputMask) {
    return (
      <div className={classes.container}>
        <InputMask
          mask={mask}
          maskChar={null}
          {...field}
          placeholder={label}
          className={classNames(classes.input, { [classes.notValid]: touched && error })}
          onFocus={() => changeFocus(field.name)}
        />
        {(touched && error) && (
        <span className={classes.error}>
          {error.message}
          !
        </span>
        )}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <input
        {...field}
        placeholder={label}
        className={classNames(classes.input, { [classes.notValid]: touched && error })}
        onFocus={() => changeFocus(field.name)}
      />
      {(touched && error) && (
      <span className={classes.error}>
        {error.message}
        !
      </span>
      )}
    </div>
  );
};

PayInput.propTypes = {
  label: PropTypes.string.isRequired,
  changeFocus: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    container: PropTypes.string,
    input: PropTypes.string,
    notValid: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  isInputMask: PropTypes.bool,
  mask: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
};

PayInput.defaultProps = {
  isInputMask: false,
};

export default PayInput;
