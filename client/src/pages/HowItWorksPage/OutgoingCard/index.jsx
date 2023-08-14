import React, {useState} from "react";
import styles from './OutgoingCard.module.scss';
import Icon from '@mdi/react';
import { mdiArrowRight, mdiArrowDown } from '@mdi/js';
import classNames from "classnames";
import PropTypes from "prop-types";

function OutgoingCard(props) {
    const {
          id, question, answer
    } = props;
    const [isOpen, setMode] = useState(id === 0);

    const clickHandler = () => {
        setMode(mode => !mode);
    };

    const className = classNames(styles.container, {
        [styles.containerOpen]: isOpen,
    });
    const classNameContent = classNames(styles.content, {
        [styles.contentOpen]: isOpen,
    });

    return (
        <article className={className}>
            <div className={styles.captionWrapper} onClick={clickHandler} >
                <h2 className={styles.captionText}>{question}</h2>
                {isOpen ? (
                    <Icon className={styles.arrow}  path={mdiArrowDown} size={1}/>
                ) : (
                    <Icon className={styles.arrow}  path={mdiArrowRight} size={1}/>
                )}
            </div>
            <p className={classNameContent}>{answer}</p>
        </article>
    );
}

const PROP_SCHEMA = {
    caption: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
}

OutgoingCard.propType = {
    itemBody: PropTypes.shape(PROP_SCHEMA).isRequired,
}

OutgoingCard.defaultProps = {
    itemBody: {
        caption: 'Test Caption Squadhelp component',
        content: 'Squadhelp component. It is a default content. Please pass real content through props',
    }
}

export default OutgoingCard;