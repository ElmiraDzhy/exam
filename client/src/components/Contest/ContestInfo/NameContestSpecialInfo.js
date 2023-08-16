import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContestInfo.module.sass';

const NameContestSpecialInfo = (props) => {
  const { typeOfName, styleName } = props;
  return (
    <>
      <div className={styles.dataContainer}>
        <span className={styles.label}>Type of Name</span>
        <span className={styles.data}>{typeOfName}</span>
      </div>
      <div className={styles.dataContainer}>
        <span className={styles.label}>Style of Name</span>
        <span className={styles.data}>{styleName}</span>
      </div>
    </>
  );
};

NameContestSpecialInfo.propTypes = {
  typeOfName: PropTypes.string.isRequired,
  styleName: PropTypes.string.isRequired,
};

export default NameContestSpecialInfo;
