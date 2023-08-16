import React from 'react';
import PropTypes from 'prop-types';
import styles from './Error.module.sass';

const Error = (props) => {
  const getMessage = () => {
    const { status, data } = props;
    switch (status) {
      case 404:
        return data;
      case 400:
        return 'Check the input data';
      case 409:
        return data;
      case 403:
        return 'Bank decline transaction';
      case 406:
        return data;
      default:
        return 'Server Error';
    }
  };

  const { clearError } = props;
  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <button onClick={() => clearError()} type="button">
        <i
          className="far fa-times-circle"
        />
      </button>
    </div>
  );
};

Error.propTypes = {
  status: PropTypes.number,
  data: PropTypes.string,
  clearError: PropTypes.func.isRequired,
};

Error.defaultProps = {
  status: 400,
  data: 'Error',
};

export default Error;
