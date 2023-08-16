import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ButtonElement.module.scss';

const ButtonElement = (props) => {
  const { content, checked, changeMode } = props;

  const cnBtn = classNames(styles['button-container'], {
    [styles['button-checked']]: checked,
  });

  const cnFlag = classNames(styles['flag-default'], {
    [styles['flag-checked']]: checked,
  });

  return (
    <button onClick={() => changeMode(content.id)} className={cnBtn} type="button">
      <span className={cnFlag}>{content.flag}</span>
      <p>{content.text}</p>
    </button>
  );
};

export default ButtonElement;

ButtonElement.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired,
  }).isRequired,
  checked: PropTypes.bool,
  changeMode: PropTypes.func.isRequired,
};

ButtonElement.defaultProps = {
  checked: false,
};
