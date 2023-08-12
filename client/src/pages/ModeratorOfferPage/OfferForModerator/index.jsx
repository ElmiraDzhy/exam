import React from "react";
import styles from './OfferForModerator.module.scss'

const OfferForModerator = (props) => {
    const {offer, confirm, rescind} = props;

    return (
        <article className={styles["container"]}>
            <div className={styles["container-content"]}>
                <p className={styles["container-text"]}>{offer.text}</p>
                {offer.fileName && <img className={styles["container-image"]} src={offer.fileName} alt={'offer file'} />}
            </div>
            <div className={styles['button-wrapper']}>
                <button className={styles["container-button"]} onClick={() => confirm(offer)}>confirm</button>
                <button className={styles["container-button"]} onClick={() => rescind(offer)}>rescind</button>
            </div>
        </article>
    );
}

export default OfferForModerator;