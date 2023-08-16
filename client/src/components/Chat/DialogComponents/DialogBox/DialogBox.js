import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './DialogBox.module.sass';
import CONSTANTS from '../../../../constants';

const DialogBox = (props) => {
  const {
    chatPreview,
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const {
    favoriteList, participants, blackList, id, text, createAt,
  } = chatPreview;
  const index = participants.indexOf(userId);
  const isFavorite = favoriteList[index];
  const isBlocked = blackList[index];
  return (
    <div
      role="button"
      tabIndex="0"
      className={styles.previewChatBox}
      onClick={() => goToExpandedDialog({
        interlocutor,
        conversationData: {
          participants,
          id,
          blackList,
          favoriteList,
        },
      })}
    >
      <img
        src={interlocutor.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${interlocutor.avatar}`}
        alt="user"
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>{interlocutor.firstName}</span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createAt)}</span>
          <i
            onClick={(event) => changeFavorite({
              participants,
              favoriteFlag: !isFavorite,
            }, event)}
            className={classNames({ 'far fa-heart': !isFavorite, 'fas fa-heart': isFavorite })}
          />
          <i
            onClick={(event) => changeBlackList({
              participants,
              blackListFlag: !isBlocked,
            }, event)}
            className={classNames({ 'fas fa-user-lock': !isBlocked, 'fas fa-unlock': isBlocked })}
          />
          <i
            onClick={(event) => catalogOperation(event, id)}
            className={classNames({
              'far fa-plus-square': chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
              'fas fa-minus-circle': chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
            })}
          />
        </div>
      </div>
    </div>
  );
};

DialogBox.propTypes = {
  userId: PropTypes.number.isRequired,
  getTimeStr: PropTypes.func.isRequired,
  changeFavorite: PropTypes.func.isRequired,
  changeBlackList: PropTypes.func.isRequired,
  catalogOperation: PropTypes.func.isRequired,
  goToExpandedDialog: PropTypes.func.isRequired,

  chatMode: PropTypes.bool.isRequired,
  interlocutor: PropTypes.shape({
    avatar: PropTypes.string,
    firstName: PropTypes.string,
  }).isRequired,

  chatPreview: PropTypes.shape({
    favoriteList: PropTypes.arrayOf(PropTypes.bool),
    participants: PropTypes.arrayOf(PropTypes.bool),
    blackList: PropTypes.arrayOf(PropTypes.bool),
    id: PropTypes.number,
    text: PropTypes.string,
    createAt: PropTypes.string,
  }).isRequired,

};

export default DialogBox;
