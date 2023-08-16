import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import {
  changeMark as changeMarkAction,
  clearChangeMarkError,
  goToExpandedDialog,
  changeShowImage,
} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

const OfferBox = (props) => {
  const findConversationInfo = () => {
    const { messagesPreview, id, data: { User } } = props;
    const participants = [id, User.id];
    participants.sort((participant1, participant2) => participant1 - participant2);
    let foundMessage = null;

    messagesPreview.forEach((messagePreview) => {
      if (isEqual(participants, messagePreview.participants)) {
        foundMessage = {
          participants: messagePreview.participants,
          id: messagePreview.id,
          blackList: messagePreview.blackList,
          favoriteList: messagePreview.favoriteList,
        };
      }
    });

    return foundMessage;
  };

  const resolveOffer = () => {
    const { setOfferStatus, data } = props;
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setOfferStatus(data.User.id, data.id, 'resolve'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(props.data.User.id, props.data.id, 'reject'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const changeMarkHandler = (value) => {
    const { clearError, changeMark } = props;
    clearError();
    changeMark({
      mark: value,
      offerId: props.data.id,
      isFirst: !props.data.mark,
      creatorId: props.data.User.id,
    });
  };

  const offerStatus = () => {
    const { data: { status } } = props;
    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return <i className={classNames('fas fa-times-circle reject', styles.reject)} />;
    } if (status === CONSTANTS.OFFER_STATUS_WON) {
      return <i className={classNames('fas fa-check-circle resolve', styles.resolve)} />;
    }
    return null;
  };

  const goChat = () => {
    props.goToExpandedDialog({
      interlocutor: props.data.User,
      conversationData: findConversationInfo(),
    });
  };

  const {
    data, role, id, contestType, needButtons,
  } = props;
  const {
    data: {
      User: {
        avatar, firstName, lastName, email, rating,
      },
    },
  } = props;
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${avatar}`}
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={(
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
              )}
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {
            contestType === CONSTANTS.LOGO_CONTEST
              ? (
                <img
                  onClick={() => props.changeShowImage(
                    { imagePath: data.fileName, isShowOnFull: true },
                  )}
                  className={styles.responseLogo}
                  src={`${data.fileName}`}
                  alt="logo"
                />
              )
              : <span className={styles.response}>{data.text}</span>
          }
          {data.User.id !== id && (
          <Rating
            fractions={2}
            fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
            placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
            emptySymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`} alt="star" />}
            onClick={changeMarkHandler}
            placeholderRating={data.mark}
          />
          )}
        </div>
        {role !== CONSTANTS.CREATOR && (
        <i
          onClick={goChat}
          className="fas fa-comments"
        />
        )}
      </div>
      {needButtons(data.status) && (
      <div className={styles.btnsContainer}>
        <div
          role="button"
          tabIndex="0"
          onClick={resolveOffer}
          className={styles.resolveBtn}
        >
          Resolve
        </div>
        <div
          role="button"
          tabIndex="0"
          onClick={rejectOffer}
          className={styles.rejectBtn}
        >
          Reject
        </div>
      </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeMark: (data) => dispatch(changeMarkAction(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

const mapStateToProps = (state) => {
  const { changeMarkError, isShowModal } = state.contestByIdStore;
  const { id, role } = state.userStore.data;
  const { messagesPreview } = state.chatStore;
  return {
    changeMarkError, id, role, messagesPreview, isShowModal,
  };
};

OfferBox.propTypes = {
  setOfferStatus: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  changeMark: PropTypes.func.isRequired,
  goToExpandedDialog: PropTypes.func.isRequired,
  changeShowImage: PropTypes.func.isRequired,
  needButtons: PropTypes.func.isRequired,

  messagesPreview: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  contestType: PropTypes.string.isRequired,

  data: PropTypes.shape({
    id: PropTypes.number,
    fileName: PropTypes.string,
    text: PropTypes.string,
    status: PropTypes.bool.isRequired,
    mark: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      avatar: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      rating: PropTypes.number,
    }),
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferBox));
