import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, useField } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const {
    fileUploadContainer, labelClass, fileNameClass, fileInput,
  } = classes;

  return (
    <Field name={rest.name}>
      {() => {
        const [fileName, setFileName] = useState('');
        const [field, , helpers] = useField(rest.name);

        const getFileName = (e) => {
          const reader = new FileReader();
          helpers.setValue(e.target.files[0]);
          reader.onload = () => {
            setFileName(e.target.files[0].name);
          };
          reader.readAsDataURL(e.target.files[0]);
        };

        return (
          <div className={fileUploadContainer}>
            <span id="fileNameContainer" className={fileNameClass}>
              {fileName}
            </span>
            <label htmlFor="fileInput" className={labelClass}>
              Choose file
              <input
                {...field}
                className={fileInput}
                id="fileInput"
                type="file"
                value={undefined}
                onChange={getFileName}
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

  name: PropTypes.string.isRequired,
};
export default FieldFileInput;
