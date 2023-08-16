import React from 'react';
import PropTypes from 'prop-types';
import styles from './NextButton.module.sass';

const NextButton = (props) => {
  const { submit } = props;

  return (
    <div
      role="button"
      tabIndex="0"
      onKeyUp="handleKeyUp(event)"
      onClick={submit}
      className={styles.buttonContainer}
    >
      <span>Next</span>
    </div>
  );
};

NextButton.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default NextButton;
