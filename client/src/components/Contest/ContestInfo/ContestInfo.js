import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../Brief/Brief.module.sass';
import CONSTANTS from '../../../constants';
import LogoContestSpecialInfo from './LogoContestSpecialInfo';
import NameContestSpecialInfo from './NameContestSpecialInfo';
import TaglineContestSpecialInfo from './TaglineContestSpecialInfo';

const ContestInfo = (props) => {
  const {
    changeEditContest, userId, contestData, role, goChat,
  } = props;
  const {
    typeOfTagline, brandStyle, typeOfName, styleName, contestType,
    title, focusOfWork, targetCustomer, industry, originalFileName,
    fileName, User, status,
  } = contestData;

  let contestElement;

  switch (contestType) {
    case CONSTANTS.NAME_CONTEST: {
      contestElement = <NameContestSpecialInfo typeOfName={typeOfName} styleName={styleName} />;
      break;
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      contestElement = (
        <TaglineContestSpecialInfo
          typeOfTagline={typeOfTagline}
          nameVenture={contestData.nameVenture}
        />
      );
      break;
    }
    default: {
      contestElement = (
        <LogoContestSpecialInfo
          brandStyle={brandStyle}
          nameVenture={contestData.nameVenture}
        />
      );
    }
  }

  return (
    <div className={styles.mainContestInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <div className={styles.dataContainer}>
            <span className={styles.label}>Contest Type</span>
            <span className={styles.data}>{contestType}</span>
          </div>
          {
            (User.id === userId && status !== CONSTANTS.CONTEST_STATUS_FINISHED)
              && (
              <div
                role="button"
                tabIndex="0"
                onKeyUp="handleKeyUp(event)"
                onClick={() => changeEditContest(true)}
                className={styles.editBtn}
              >
                Edit
              </div>
              )
          }
          {
            role !== CONSTANTS.CUSTOMER
              && <i onClick={goChat} className="fas fa-comments" />
          }
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Title of the Project</span>
          <span className={styles.data}>{title}</span>
        </div>
        {
          contestElement
        }
        <div className={styles.dataContainer}>
          <span className={styles.label}>What is your Business/ Brand about?</span>
          <span className={styles.data}>{focusOfWork}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Description target customers of company </span>
          <span className={styles.data}>{targetCustomer}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Industry  of company</span>
          <span className={styles.data}>{industry}</span>
        </div>
        {originalFileName && (
          <div className={styles.dataContainer}>
            <span className={styles.label}>Additional File</span>
            <a
              target="_blank"
              className={styles.file}
              href={`${CONSTANTS.publicURL}${fileName}`}
              download={originalFileName}
              rel="noreferrer"
            >
              {originalFileName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

ContestInfo.propTypes = {
  changeEditContest: PropTypes.func.isRequired,
  goChat: PropTypes.func.isRequired,

  userId: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,

  contestData: PropTypes.shape({
    typeOfTagline: PropTypes.string,
    brandStyle: PropTypes.string,
    typeOfName: PropTypes.string,
    styleName: PropTypes.string,
    contestType: PropTypes.string,
    title: PropTypes.string,
    focusOfWork: PropTypes.string,
    targetCustomer: PropTypes.string,
    industry: PropTypes.string,
    originalFileName: PropTypes.string,
    fileName: PropTypes.string,
    User: PropTypes.shape({
      id: PropTypes.number,
    }),
    status: PropTypes.string,
    nameVenture: PropTypes.string,
  }).isRequired,
};

export default ContestInfo;
