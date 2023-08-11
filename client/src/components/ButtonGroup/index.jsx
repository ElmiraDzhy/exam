import React, {useState} from "react";
import ButtonElement from "./ButtonElement";
import styles from './ButtonGroup.module.scss';

const buttonsContent = [{
    id: 1,
    flag: 'yes',
    text: 'The Domain should exactly match the name',
}, {
    id: 2,
    flag: 'yes',
    text: 'But minor variations are allowed (Recommended)',
}, {
    id: 3,
    flag: 'no',
    text: 'I am only looking for a name, not a Domain',
}];

const ButtonGroup = (props) => {

    const [checkedButtonId, setCheckedButton] = useState(2);

    return(
        <article className={styles['button-group-container']}>
            {buttonsContent.map(item => <ButtonElement content={item} checked={checkedButtonId === item.id} changeMode={setCheckedButton} key={item.id}/>)}
        </article>
    );
}

export default ButtonGroup;