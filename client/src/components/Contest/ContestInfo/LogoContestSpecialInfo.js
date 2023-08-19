import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContestInfo.module.sass';

const LogoContestSpecialInfo = (props) => {
  const { nameVenture, brandStyle } = props;
  return (
    <>
      {nameVenture && (
      <div className={styles.dataContainer}>
        <span className={styles.label}>Name venture</span>
        <span className={styles.data}>{nameVenture}</span>
      </div>
      )}
      <div className={styles.dataContainer}>
        <span className={styles.label}>Brand Style</span>
        <span className={styles.data}>{brandStyle}</span>
      </div>
    </>
  );
};

LogoContestSpecialInfo.propTypes = {
  nameVenture: PropTypes.string,
  brandStyle: PropTypes.string.isRequired,
};

LogoContestSpecialInfo.defaultProps = {
  nameVenture: '',
};

export default LogoContestSpecialInfo;
