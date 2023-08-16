import React from 'react';
import PropTypes from 'prop-types';
import styles from './OfferForModerator.module.scss';

const OfferForModerator = (props) => {
  const { offer, confirm, rescind } = props;

  return (
    <article className={styles.container}>
      <div className={styles['container-content']}>
        <p className={styles['container-text']}>{offer.text}</p>
        {offer.fileName && <img className={styles['container-image']} src={offer.fileName} alt="offer file" />}
      </div>
      <div className={styles['button-wrapper']}>
        <button className={styles['container-button']} onClick={() => confirm(offer)} type="button">confirm</button>
        <button className={styles['container-button']} onClick={() => rescind(offer)} type="button">rescind</button>
      </div>
    </article>
  );
};

OfferForModerator.propTypes = {
  offer: PropTypes.shape({
    text: PropTypes.string,
    fileName: PropTypes.string,
  }).isRequired,
  confirm: PropTypes.func.isRequired,
  rescind: PropTypes.func.isRequired,
};

export default OfferForModerator;
