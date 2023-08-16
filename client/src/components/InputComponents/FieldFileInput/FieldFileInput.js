import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const {
    fileUploadContainer, labelClass, fileNameClass, fileInput,
  } = classes;

  return (
    <Field name={rest.name}>
      {(props) => {
        const {
          field,
        } = props;

        const getFileName = () => {
          if (props.field.value) {
            return props.field.value.name;
          }
          return '';
        };

        return (
          <div className={fileUploadContainer}>
            <span id="fileNameContainer" className={fileNameClass}>
              {getFileName()}
            </span>
            <label htmlFor="fileInput" className={labelClass}>
              Choose file
              <input
                {...field}
                className={fileInput}
                id="fileInput"
                type="file"
              />
            </label>
          </div>
        );
      }}
    </Field>
  );
};

FieldFileInput.propTypes = {
  classes: PropTypes.shape({
    fileUploadContainer: PropTypes.string.isRequired,
    labelClass: PropTypes.string.isRequired,
    fileNameClass: PropTypes.string.isRequired,
    fileInput: PropTypes.string.isRequired,
  }).isRequired,

  field: PropTypes.shape({
    value: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,

};
export default FieldFileInput;
