import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatsCard.module.scss';

const StatsCard = (props) => {
  const { iconSrc, children } = props;
  const boldStyles = styles['bold-text'];
  const textStyles = styles.text;
  return (
    <article className={styles.container}>
      <img className={styles['icon-stats']} src={iconSrc} alt="icon" />
      <p>{children({ boldStyles, textStyles })}</p>
    </article>
  );
};

StatsCard.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default StatsCard;
