import React from "react";
import PropTypes from 'prop-types';
import styles from './PricingCard.module.scss';

const PricingCard = (props) => {
    const headerStyles = styles.header;
    const textStyles = styles.text;
    const arrowStyles = styles['arrow-container'];

    return (
        <article className={styles.container}>
            {props.children({headerStyles, textStyles, arrowStyles})}
        </article>
    )

}

PricingCard.propTypes = {
    children: PropTypes.func.isRequired,
};

export default PricingCard;