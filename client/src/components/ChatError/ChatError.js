import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChatError.module.sass';

const ChatError = (props) => {
  const { getData } = props;
  return (
    <div
      role="button"
      tabIndex="0"
      className={styles.errorContainer}
      onClick={() => getData()}
    >
      <div className={styles.container}>
        <span>Server Error</span>
        <i className="fas fa-redo" />
      </div>
    </div>
  );
};

ChatError.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default ChatError;
