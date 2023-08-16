import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './BackButton.module.sass';

const BackButton = (props) => {
  function clickHandler() {
    props.history.goBack();
  }

  return (
    <button onClick={clickHandler} className={styles.buttonContainer} type="button">
      <span>Back</span>
    </button>
  );
};

export default withRouter(BackButton);

BackButton.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};
