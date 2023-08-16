import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import DialogListContainer from '../../DialogComponents/DialogListContainer/DialogListContainer';
import styles from './Chat.module.sass';
import Dialog from '../../DialogComponents/Dialog/Dialog';
import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from '../../../../actions/actionCreator';
import { chatController } from '../../../../api/ws/socketController';
import CONSTANTS from '../../../../constants';
import CatalogListContainer from '../../CatalogComponents/CatalogListContainer/CatalogListContainer';
import CatalogCreation from '../../CatalogComponents/CatalogCreation/CatalogCreation';
import CatalogListHeader from '../../CatalogComponents/CatalogListHeader/CatalogListHeader';
import ChatError from '../../../ChatError/ChatError';

class Chat extends React.Component {
  componentDidMount() {
    const { userStore: { data: { id } }, getPreviewChatDispatch } = this.props;
    chatController.subscribeChat(id);
    getPreviewChatDispatch();
  }

  componentWillUnmount() {
    const { userStore: { data: { id } } } = this.props;
    chatController.unsubscribeChat(id);
  }

    renderDialogList = () => {
      const { setChatPreviewMode } = this.props;
      const {
        chatStore: { chatMode, isShowChatsInCatalog },
        userStore: { data: { id } },
      } = this.props;
      const {
        NORMAL_PREVIEW_CHAT_MODE,
        FAVORITE_PREVIEW_CHAT_MODE,
        BLOCKED_PREVIEW_CHAT_MODE,
        CATALOG_PREVIEW_CHAT_MODE,
      } = CONSTANTS;
      return (
        <div>
          {isShowChatsInCatalog && <CatalogListHeader />}
          {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </div>
          )}
          {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            <span
              role="button"
              tabIndex="0"
              onKeyUp="handleKeyUp(event)"
              onClick={() => setChatPreviewMode(NORMAL_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button,
                { [styles.activeButton]: chatMode === NORMAL_PREVIEW_CHAT_MODE })}
            >
              Normal
            </span>
            <span
              role="button"
              tabIndex="0"
              onKeyUp="handleKeyUp(event)"
              onClick={() => setChatPreviewMode(FAVORITE_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button,
                { [styles.activeButton]: chatMode === FAVORITE_PREVIEW_CHAT_MODE })}
            >
              Favorite
            </span>
            <span
              role="button"
              tabIndex="0"
              onKeyUp="handleKeyUp(event)"
              onClick={() => setChatPreviewMode(BLOCKED_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button,
                { [styles.activeButton]: chatMode === BLOCKED_PREVIEW_CHAT_MODE })}
            >
              Blocked
            </span>
            <span
              role="button"
              tabIndex="0"
              onKeyUp="handleKeyUp(event)"
              onClick={() => setChatPreviewMode(CATALOG_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button,
                { [styles.activeButton]: chatMode === CATALOG_PREVIEW_CHAT_MODE })}
            >
              Catalog
            </span>
          </div>
          )}
          {chatMode === CATALOG_PREVIEW_CHAT_MODE
            ? <CatalogListContainer /> : <DialogListContainer userId={id} />}
        </div>
      );
    };

    render() {
      const {
        chatStore: {
          isExpanded, isShow, isShowCatalogCreation, error,
        },
        userStore: {
          data: { id },
        },
      } = this.props;

      const { changeShow, getPreviewChatDispatch } = this.props;
      return (
        <div className={classNames(styles.chatContainer, { [styles.showChat]: isShow })}>
          {error && <ChatError getData={getPreviewChatDispatch} />}
          {isShowCatalogCreation && <CatalogCreation />}
          {isExpanded ? <Dialog userId={id} /> : this.renderDialogList()}
          <div
            role="button"
            tabIndex="0"
            onKeyUp="handleKeyUp(event)"
            className={styles.toggleChat}
            onClick={() => changeShow()}
          >
            {isShow ? 'Hide Chat' : 'Show Chat'}
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: (mode) => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChatDispatch: () => dispatch(getPreviewChat()),
});

Chat.propTypes = {
  userStore: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,

  getPreviewChatDispatch: PropTypes.func.isRequired,

  setChatPreviewMode: PropTypes.func.isRequired,

  chatStore: PropTypes.shape({
    chatMode: PropTypes.bool,
    isShowChatsInCatalog: PropTypes.bool,
    isExpanded: PropTypes.bool,
    isShow: PropTypes.bool,
    isShowCatalogCreation: PropTypes.bool,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
  }).isRequired,

  changeShow: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
