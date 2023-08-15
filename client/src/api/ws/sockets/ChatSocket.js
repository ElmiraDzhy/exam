import isEqual from 'lodash/isEqual';
import WebSocket from './WebSocket';
import CONSTANTS from '../../../constants';
import { addMessage, changeBlockStatusInStore } from '../../../actions/actionCreator';

class ChatSocket extends WebSocket {
    anotherSubscribes = () => {
      this.onNewMessage();
      this.onChangeBlockStatus();
    };

    onChangeBlockStatus = () => {
      this.socket.on(CONSTANTS.CHANGE_BLOCK_STATUS, (data) => {
        const { message } = data;
        const { messagesPreview } = this.getState().chatStore;
        const formattedMessagePreviews = messagesPreview.map((preview) => {
          const newPreview = { ...preview };

          if (isEqual(newPreview.participants, message.participants)) {
            newPreview.blackList = message.blackList;
          }

          return newPreview;
        });
        this.dispatch(changeBlockStatusInStore({ chatData: message, formattedMessagePreviews }));
      });
    };

    onNewMessage = () => {
      this.socket.on('newMessage', (data) => {
        const { message } = data.message;
        const { messagesPreview } = this.getState().chatStore;
        const formattedMessagePreviews = messagesPreview.forEach((preview) => {
          const newPreview = { ...preview };

          const isPreview = newPreview.participants.every(
            (value) => data.message.preview.participants.includes(value),
          );

          if (isPreview) {
            newPreview.text = message.body;
            newPreview.sender = message.sender;
            newPreview.createAt = message.createdAt;
          }

          return newPreview;
        });

        this.dispatch(addMessage({ message, formattedMessagePreviews }));
      });
    };

    subscribeChat = (id) => {
      this.socket.emit('subscribeChat', id);
    };

    unsubscribeChat = (id) => {
      this.socket.emit('unsubscribeChat', id);
    };
}

export default ChatSocket;
