import React from "react";
import styles from './StatsCard.module.scss';

const StatsCard = (props) => {
    const {iconSrc} = props;
    const boldStyles = styles['bold-text'];
    const textStyles = styles['text'];
    return (
        <article className={styles.container}>
            <img className={styles['icon-stats']} src={iconSrc} alt={"icon"}/>
            <p>{props.children({boldStyles, textStyles})}</p>
        </article>
    )
}

export default StatsCard;