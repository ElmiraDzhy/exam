import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProgressBar.module.sass';

const ProgressBar = (props) => {
  const renderBar = (count) => {
    const { currentStep } = props;
    let classOuter = styles.outerNotActive;
    let classInner = styles.innerNotActive;
    let classProgress = '';
    if (count === currentStep) {
      classOuter = styles.outerActive;
      classInner = styles.innerActive;
      classProgress = styles.progressContainer;
    }
    if (count < currentStep) {
      classOuter = styles.outerComplete;
      classInner = styles.innerComplete;
    }
    return (
      <div className={classProgress} key={count}>
        <div className={styles.progressBarContainer}>
          <div className={classOuter}>
            <div className={classInner} />
          </div>
          {count !== 3 && <div className={styles.lineBar} />}
        </div>
      </div>
    );
  };

  const renderProgress = () => {
    const array = [];

    [1, 2, 3].forEach((i) => {
      array.push(renderBar(i));
    });

    return array;
  };

  return (
    <div className={styles.progressBarContainer}>
      {renderProgress()}
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
