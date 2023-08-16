import React from 'react';
import PropTypes from 'prop-types';
import styles from './InfoCard.module.scss';

const InfoCard = ({
  imageSrc, header, info, buttonText,
}) => {
  return (
    <article className={styles.container}>
      <img className={styles.icon} src={imageSrc} alt="icon" />
      <h3 className={styles.header}>{header}</h3>
      <p className={styles.info}>{info}</p>
      <a href="/#" className={styles['btn-link']}>{buttonText}</a>
    </article>
  );
};

InfoCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default InfoCard;
