import React from "react";
import styles from './StepCard.module.scss'
import PropTypes from "prop-types";

const StepCard = ({stepNumber, stepText}) => {
return(
    <article className={styles.container}>
        <p className={styles['step-number']}>{stepNumber}.</p>
        <p className={styles['step-text']}>{stepText}</p>
    </article>
);
}

StepCard.propTypes = {
    stepNumber: PropTypes.string.isRequired,
    stepText: PropTypes.string.isRequired,
};

StepCard.defaultProps = {
    stepNumber: '1',
    stepText: 'This is default text for StepCard',
};

export default StepCard;