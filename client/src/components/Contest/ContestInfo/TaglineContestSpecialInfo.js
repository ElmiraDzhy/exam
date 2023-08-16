import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContestInfo.module.sass';

const TaglineContestSpecialInfo = (props) => {
  const { nameVenture, typeOfTagline } = props;
  return (
    <>
      {nameVenture && (
      <div className={styles.dataContainer}>
        <span className={styles.label}>Name venture</span>
        <span className={styles.data}>{nameVenture}</span>
      </div>
      )}
      <div className={styles.dataContainer}>
        <span className={styles.label}>Type of Tagline</span>
        <span className={styles.data}>{typeOfTagline}</span>
      </div>
    </>
  );
};

TaglineContestSpecialInfo.propTypes = {
  nameVenture: PropTypes.string.isRequired,
  typeOfTagline: PropTypes.string.isRequired,
};
export default TaglineContestSpecialInfo;
