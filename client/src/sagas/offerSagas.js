import { put, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import CONSTANTS from '../constants';

export function* changeMarkSaga(action) {
  try {
    const { data } = yield restController.changeMark(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    const formattedOffers = offers.map((offer) => {
      const newOffer = { ...offer };

      if (offer.User.id === data.userId) {
        newOffer.User.rating = data.rating;
      }
      if (offer.id === action.data.offerId) {
        newOffer.mark = action.data.mark;
      }

      return newOffer;
    });
    yield put({ type: ACTION.CHANGE_MARK_SUCCESS, data: formattedOffers });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_MARK_ERROR, error: err.response });
  }
}

export function* addOfferSaga(action) {
  try {
    const { data } = yield restController.setNewOffer(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.unshift(data);
    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers });
  } catch (e) {
    yield put({ type: ACTION.ADD_OFFER_ERROR, error: e.response });
  }
}

export function* setOfferStatusSaga(action) {
  try {
    const { data } = yield restController.setOfferStatus(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    const formattedOffers = offers.map((offer) => {
      const newOffer = { ...offer };

      if (data.status === CONSTANTS.OFFER_STATUS_WON) {
        newOffer.status = data.id === offer.id
          ? CONSTANTS.OFFER_STATUS_WON
          : CONSTANTS.OFFER_STATUS_REJECTED;
      } else if (data.id === offer.id) {
        newOffer.status = CONSTANTS.OFFER_STATUS_REJECTED;
      }

      return newOffer;
    });
    yield put({ type: ACTION.CHANGE_STORE_FOR_STATUS, data: formattedOffers });
  } catch (e) {
    yield put({ type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response });
  }
}
