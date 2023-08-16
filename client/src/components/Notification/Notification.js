import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './Notification.module.sass';

const Notification = (props) => {
  const { message, history, contestId } = props;
  return (
    <div>
      <br />
      <span>{message}</span>
      <br />
      {contestId
            && (
            <span
              role="button"
              tabIndex="0"
              onClick={() => history.push(`/contest/${contestId}`)}
              className={styles.goToContest}
            >
              Go to contest
            </span>
            )}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  contestId: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Notification);
