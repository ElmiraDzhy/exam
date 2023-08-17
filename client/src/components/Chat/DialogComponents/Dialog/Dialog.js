import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import { getDialogMessages, clearMessageList } from '../../../../actions/actionCreator';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';

const Dialog = (props) => {
  const {
    interlocutor, messages, getDialog, clearMessageListDispatch, chatData, userId,
  } = props;

  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the container whenever new messages are added
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    getDialog({ interlocutorId: interlocutor?.id });
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [interlocutor.id]);

  useEffect(() => {
    getDialog({ interlocutorId: interlocutor?.id });
    containerRef.current.scrollTop = containerRef.current.scrollHeight;

    return () => {
      clearMessageListDispatch();
    };
  }, []);

  const renderMainDialog = () => {
    const messagesArray = [];
    let currentTime = moment();

    messages.forEach((message) => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>,
        );
        currentTime = moment(message.createdAt);
      }

      const classToApply = userId === message.ConversationUser.userId
        ? styles.ownMessage
        : styles.message;

      messagesArray.push(
        <div
          key={message.id}
          className={
            className(classToApply)
          }
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>{moment(message.createdAt).format('HH:mm')}</span>
        </div>,
      );
    });

    return (
      <div className={styles.messageList}>
        {messagesArray}
      </div>
    );
  };

  const blockMessage = () => {
    const { chatData: { blackList, participants } } = props;
    const userIndex = participants.indexOf(userId);
    let message;
    if (chatData && blackList[userIndex]) {
      message = 'You blocked him';
    } else if (chatData && blackList.includes(true)) {
      message = 'This user blocked you';
    }
    return (
      <span className={styles.messageBlock}>{message}</span>
    );
  };

  return (
    <div ref={containerRef}>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      {(chatData && chatData.blackList.includes(true)) ? blockMessage() : <ChatInput />}
    </div>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageListDispatch: () => dispatch(clearMessageList()),
});

Dialog.propTypes = {
  getDialog: PropTypes.func.isRequired,
  clearMessageListDispatch: PropTypes.func.isRequired,

  userId: PropTypes.number.isRequired,

  interlocutor: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,

  chatData: PropTypes.shape({
    blackList: PropTypes.arrayOf(PropTypes.bool),
    participants: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
