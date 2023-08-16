import React from 'react';
import PropTypes from 'prop-types';
import styles from './BundleBox.module.sass';
import CONSTANTS from '../../constants';

const BundleBox = (props) => {
  const defaultPathToImages = `${CONSTANTS.STATIC_IMAGES_PATH}contestLabels/`;

  const renderImage = () => {
    const array = [];

    props.path.forEach((item) => {
      array.push(<img
        src={defaultPathToImages + item}
        key={array.length}
        className={styles.imgContainer}
        alt={item.replace(/.png/g, 'Contest')}
      />);
    });
    return array;
  };

  const mouseOverHandler = () => {
    const element = document.getElementById(props.header);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src = `${defaultPathToImages}blue_${props.path[i]}`;
    }

    element.children[0].children.forEach((child, i) => {
      // eslint-disable-next-line no-param-reassign
      child.src = `${defaultPathToImages}blue_${props.path[i]}`;
    });
  };

  const mouseOutHandler = () => {
    const element = document.getElementById(props.header);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src = defaultPathToImages + props.path[i];
    }
  };

  const getBackClass = () => (props.path.length === 1 ? ' ' : ` ${styles.combinedBundle}`);

  const { setBundle, header, describe } = props;
  return (
    <div
      role="button"
      tabIndex="0"
      onKeyUp="handleKeyUp(event)"
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      onBlur={mouseOutHandler}
      onFocus={mouseOutHandler}
      onClick={() => setBundle(header)}
      id={header}
      className={styles.bundleContainer + getBackClass()}
    >
      <div>
        {renderImage()}
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </div>
    </div>
  );
};

export default BundleBox;

BundleBox.propTypes = {
  path: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.string.isRequired,
  setBundle: PropTypes.func.isRequired,
  describe: PropTypes.string.isRequired,
};
