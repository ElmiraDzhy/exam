import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

const SelectInput = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...props
}) => {
  const {
    form: { setFieldValue },
    meta: { initialValue },
    field,
  } = props;

  const getOptionsArray = () => {
    const array = [];

    optionsArray.forEach((option, i) => {
      if (valueArray) {
        array.push(
          <option key={array.length} value={valueArray[i]}>
            {option}
          </option>,
        );
      } else {
        array.push(<option key={array.length}>{option}</option>);
      }
    });

    return array;
  };

  useLayoutEffect(() => {
    if (!initialValue && optionsArray) {
      setFieldValue(field.name, valueArray ? valueArray[0] : optionsArray[0]);
    }
  }, []);

  return (
    <div className={classes.inputContainer}>
      <span className={classes.inputHeader}>{header}</span>
      <select {...field} className={classes.selectInput}>
        {getOptionsArray()}
      </select>
    </div>
  );
};

const SelectInputWrapper = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...rest
}) => (
  <Field {...rest}>
    {(fieldProps) => (
      <>
        <SelectInput
          {...fieldProps}
          header={header}
          classes={classes}
          optionsArray={optionsArray}
          valueArray={valueArray}
        />
        <ErrorMessage name={fieldProps.field.name} component="span" className={classes.warning} />
      </>
    )}
  </Field>
);

SelectInput.propTypes = {
  header: PropTypes.string.isRequired,
  optionsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  valueArray: PropTypes.arrayOf(PropTypes.string).isRequired,

  form: PropTypes.shape({
    setFieldValue: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    initialValue: PropTypes.shape({}),
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    inputContainer: PropTypes.string,
    inputHeader: PropTypes.string,
    selectInput: PropTypes.string,
  }).isRequired,

};

SelectInputWrapper.propTypes = {
  header: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    warning: PropTypes.string,
  }).isRequired,
  optionsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  valueArray: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default SelectInputWrapper;
