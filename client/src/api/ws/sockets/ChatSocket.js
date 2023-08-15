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
        messagesPreview.forEach((preview) => {
          if (isEqual(preview.participants, message.participants)) {
            preview.blackList = message.blackList;
          }
        });
        this.dispatch(changeBlockStatusInStore({ chatData: message, messagesPreview }));
      });
    };

    onNewMessage = () => {
      this.socket.on('newMessage', (data) => {
        const { message } = data.message;
        const { messagesPreview } = this.getState().chatStore;
        messagesPreview.forEach((preview) => {
          const isPreview = preview.participants.every(
            (value) => data.message.preview.participants.includes(value),
          );

          if (isPreview) {
            preview.text = message.body;
            preview.sender = message.sender;
            preview.createAt = message.createdAt;
          }
        });

        this.dispatch(addMessage({ message, messagesPreview }));
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
