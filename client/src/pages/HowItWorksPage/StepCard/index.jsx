import React from 'react';
import PropTypes from 'prop-types';
import styles from './StepCard.module.scss';

const StepCard = ({ stepNumber, stepText }) => {
  return (
    <article className={styles.container}>
      <p className={styles['step-number']}>
        {stepNumber}
        .
      </p>
      <p className={styles['step-text']}>{stepText}</p>
    </article>
  );
};

StepCard.propTypes = {
  stepNumber: PropTypes.string.isRequired,
  stepText: PropTypes.string.isRequired,
};

export default StepCard;
