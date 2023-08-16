import React from 'react';
import PropTypes from 'prop-types';
import styles from './TryAgain.module.sass';

const TryAgain = (props) => {
  const { getData } = props;
  return (
    <div className={styles.container}>
      <span
        role="button"
        tabIndex="0"
        onKeyUp="handleKeyUp(event)"
        onClick={() => getData()}
      >
        Server Error. Try again
      </span>
      <i className="fas fa-redo" onClick={() => getData()} />
    </div>
  );
};

TryAgain.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default TryAgain;
