import { put, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* previewSaga() {
  try {
    const { data } = yield restController.getPreviewChat();
    yield put({ type: ACTION.GET_PREVIEW_CHAT, data });
  } catch (err) {
    yield put({ type: ACTION.GET_PREVIEW_CHAT_ERROR, error: err.response });
  }
}

export function* getDialog(action) {
  try {
    const { data } = yield restController.getDialog(action.data);
    yield put({ type: ACTION.GET_DIALOG_MESSAGES, data });
  } catch (err) {
    yield put({ type: ACTION.GET_DIALOG_MESSAGES_ERROR, error: err.response });
  }
}

export function* sendMessage(action) {
  try {
    const { data } = yield restController.newMessage(action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);
    const formattedMessagePreviews = messagesPreview.map((preview) => {
      const formattedPreview = { ...preview };
      const isValid = formattedPreview.participants.every(
        (value) => data.preview.participants.includes(value),
      );

      if (isValid) {
        formattedPreview.text = data.preview.text;
        formattedPreview.sender = data.preview.sender;
        formattedPreview.createAt = data.preview.createdAt;
      }

      return formattedPreview;
    });

    yield put({
      type: ACTION.SEND_MESSAGE,
      data: {
        message: data.message,
        messagesPreview: formattedMessagePreviews,
        chatData: {
          id: data.preview.id,
          participants: data.preview.participants,
          favoriteList: data.preview.favoriteList,
          blackList: data.preview.blackList,
        },
      },
    });
  } catch (err) {
    yield put({ type: ACTION.SEND_MESSAGE_ERROR, error: err.response });
  }
}

export function* changeChatFavorite(action) {
  try {
    const { data } = yield restController.changeChatFavorite(action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);

    const formattedMessagePreviews = messagesPreview.map((preview) => {
      const formattedPreview = { ...preview };
      if (formattedPreview.participants.every((value) => data.participants.includes(value))) {
        formattedPreview.favoriteList = data.favoriteList;
      }

      return formattedPreview;
    });

    yield put(
      {
        type: ACTION.CHANGE_CHAT_FAVORITE,
        data: { changedPreview: data, messagesPreview: formattedMessagePreviews },
      },
    );
  } catch (err) {
    yield put({ type: ACTION.SET_CHAT_FAVORITE_ERROR, error: err.response });
  }
}

export function* changeChatBlock(action) {
  try {
    const { data } = yield restController.changeChatBlock(action.data);
    const { messagesPreview } = yield select((state) => state.chatStore);
    const formattedMessagePreviews = messagesPreview.map((preview) => {
      const formattedPreview = { ...preview };

      if (formattedPreview.participants.every((value) => data.participants.includes(value))) {
        formattedPreview.blackList = data.blackList;
      }

      return formattedPreview;
    });
    yield put(
      {
        type: ACTION.CHANGE_CHAT_BLOCK,
        data: { messagesPreview: formattedMessagePreviews, chatData: data },
      },
    );
  } catch (err) {
    yield put({ type: ACTION.SET_CHAT_BLOCK_ERROR, error: err.response });
  }
}

export function* getCatalogListSaga(action) {
  try {
    const { data: { data } } = yield restController.getCatalogList(action.data);
    yield put({ type: ACTION.RECEIVE_CATALOG_LIST, data });
  } catch (err) {
    yield put({ type: ACTION.RECEIVE_CATALOG_LIST_ERROR, error: err.response });
  }
}

export function* addChatToCatalog(action) {
  try {
    const { data } = yield restController.addChatToCatalog(action.data);
    const { catalogList } = yield select((state) => state.chatStore);

    const itemToUpdate = catalogList.find((item) => item._id === data._id);

    if (itemToUpdate) {
      itemToUpdate.chats.push(data.id);
    }

    yield put({ type: ACTION.ADD_CHAT_TO_CATALOG, data: catalogList });
  } catch (err) {
    yield put({ type: ACTION.ADD_CHAT_TO_CATALOG_ERROR, error: err.response });
  }
}

export function* createCatalog(action) {
  try {
    const { data } = yield restController.createCatalog(action.data);
    yield put({ type: ACTION.CREATE_CATALOG_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.CREATE_CATALOG_ERROR, error: err.response });
  }
}

export function* deleteCatalog(action) {
  try {
    const { data } = yield restController.deleteCatalog(action.data);
    yield put({ type: ACTION.DELETE_CATALOG_SUCCESS, data });
  } catch (err) {
    yield put({ type: ACTION.DELETE_CATALOG_ERROR, error: err.response });
  }
}

export function* removeChatFromCatalogSaga(action) {
  try {
    const { data } = yield restController.removeChatFromCatalog(action.data);
    const { catalogList } = yield select((state) => state.chatStore);

    const itemToUpdate = catalogList.find((item) => item.id === data.id);

    if (itemToUpdate) {
      itemToUpdate.chats = data.chats;
    }

    yield put(
      {
        type: ACTION.REMOVE_CHAT_FROM_CATALOG_SUCCESS,
        data: { catalogList, currentCatalog: data },
      },
    );
  } catch (err) {
    yield put({ type: ACTION.REMOVE_CHAT_FROM_CATALOG_ERROR, error: err.response });
  }
}

export function* changeCatalogName(action) {
  try {
    const { data } = yield restController.changeCatalogName(action.data);
    const { catalogList } = yield select((state) => state.chatStore);

    const itemToUpdate = catalogList.find((item) => item._id === data._id);

    if (itemToUpdate) {
      itemToUpdate.catalogName = data.catalogName;
    }

    yield put(
      {
        type: ACTION.CHANGE_CATALOG_NAME_SUCCESS,
        data: { catalogList, currentCatalog: data },
      },
    );
  } catch (err) {
    yield put({ type: ACTION.CHANGE_CATALOG_NAME_ERROR, error: err.response });
  }
}
