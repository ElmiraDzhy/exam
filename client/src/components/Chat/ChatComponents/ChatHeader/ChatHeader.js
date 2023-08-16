import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { backToDialogList, changeChatFavorite, changeChatBlock } from '../../../../actions/actionCreator';
import styles from './ChatHeader.module.sass';
import CONSTANTS from '../../../../constants';

const ChatHeader = (props) => {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const isFavorite = (chatData, userId) => {
    const { favoriteList, participants } = chatData;
    return favoriteList[participants.indexOf(userId)];
  };

  const isBlocked = (chatData, userId) => {
    const { participants, blackList } = chatData;
    return blackList[participants.indexOf(userId)];
  };

  const { interlocutor: { avatar, firstName } } = props;
  const { backToDialogListDispatch, chatData, userId } = props;
  return (
    <div className={styles.chatHeader}>
      <div
        role="button"
        tabIndex="0"
        onKeyUp="handleKeyUp(event)"
        className={styles.buttonContainer}
        onClick={() => backToDialogListDispatch()}
      >
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`} alt="back" />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${avatar}`}
            alt="user"
          />
          <span>{firstName}</span>
        </div>
        {chatData
                && (
                <div>
                  <i
                    onClick={(event) => changeFavorite({
                      participants: chatData.participants,
                      favoriteFlag: !isFavorite(chatData, userId),
                    }, event)}
                    className={classNames({
                      'far fa-heart': !isFavorite(chatData, userId),
                      'fas fa-heart': isFavorite(chatData, userId),
                    })}
                  />
                  <i
                    onClick={(event) => changeBlackList({
                      participants: chatData.participants,
                      blackListFlag: !isBlocked(chatData, userId),
                    }, event)}
                    className={classNames({
                      'fas fa-user-lock': !isBlocked(chatData, userId),
                      'fas fa-unlock': isBlocked(chatData, userId),
                    })}
                  />
                </div>
                )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { interlocutor, chatData } = state.chatStore;
  return { interlocutor, chatData };
};

const mapDispatchToProps = (dispatch) => ({
  backToDialogListDispatch: () => dispatch(backToDialogList()),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
});

ChatHeader.propTypes = {
  changeChatFavorite: PropTypes.func.isRequired,
  changeChatBlock: PropTypes.func.isRequired,
  backToDialogListDispatch: PropTypes.func.isRequired,

  userId: PropTypes.number.isRequired,

  chatData: PropTypes.shape({
    participants: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  interlocutor: PropTypes.shape({
    avatar: PropTypes.string,
    firstName: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
