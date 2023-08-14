import React from 'react';
import classNames from 'classnames';
import styles from './ButtonElement.module.scss';

const ButtonElement = (props) => {
 const {content, checked, changeMode} = props;

    const cnBtn = classNames(styles['button-container'], {
        [styles['button-checked']]: checked
    });

    const cnFlag = classNames(styles['flag-default'], {
        [styles['flag-checked']]: checked
    });

    return <button onClick={() => changeMode(content.id)} className={cnBtn}>
                <span className={cnFlag}>{content.flag}</span>
                <p>{content.text}</p>
           </button>
}

export default ButtonElement;