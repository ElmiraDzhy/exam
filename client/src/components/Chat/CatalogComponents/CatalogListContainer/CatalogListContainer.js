import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCatalogList, removeChatFromCatalog } from '../../../../actions/actionCreator';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

class CatalogListContainer extends React.Component {
  componentDidMount() {
    const { getCatalogListDispatch } = this.props;
    getCatalogListDispatch();
  }

    removeChatFromCatalog = (event, chatId) => {
      const { chatStore: { currentCatalog: { id } }, removeChatFromCatalogDispatch } = this.props;
      removeChatFromCatalogDispatch({ chatId, catalogId: id });
      event.stopPropagation();
    };

    getDialogsPreview = () => {
      const { chatStore: { messagesPreview, currentCatalog } } = this.props;
      const { chats } = currentCatalog;
      const dialogsInCatalog = [];

      messagesPreview.forEach((messagePreview) => {
        chats.forEach((chatId) => {
          if (chatId === messagePreview.id) {
            dialogsInCatalog.push(messagePreview);
          }
        });
      });

      return dialogsInCatalog;
    };

    render() {
      const { chatStore: { isShowChatsInCatalog } } = this.props;
      const { userStore: { data: { id } } } = this.props;
      return (
        <>
          {isShowChatsInCatalog ? (
            <DialogList
              userId={id}
              preview={this.getDialogsPreview()}
              removeChat={this.removeChatFromCatalog}
            />
          )
            : <CatalogList />}
        </>
      );
    }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogListDispatch: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalogDispatch: (data) => dispatch(removeChatFromCatalog(data)),
});

CatalogListContainer.propTypes = {
  getCatalogListDispatch: PropTypes.func.isRequired,
  removeChatFromCatalogDispatch: PropTypes.func.isRequired,

  chatStore: PropTypes.shape({
    currentCatalog: PropTypes.shape({
      id: PropTypes.number,
      chats: PropTypes.arrayOf(PropTypes.number),
    }),
    messagesPreview: PropTypes.arrayOf(PropTypes.object),
    isShowChatsInCatalog: PropTypes.bool,
  }).isRequired,

  userStore: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogListContainer);
