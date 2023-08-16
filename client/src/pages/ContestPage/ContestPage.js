import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-image-lightbox';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  goToExpandedDialog,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../actions/actionCreator';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-image-lightbox/style.css';
import Error from '../../components/Error/Error';

class ContestPage extends React.Component {
  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    const { changeEditContestDispatch } = this.props;
    changeEditContestDispatch(false);
  }

  getData = () => {
    const { match: { params: { id } }, getDataDispatch } = this.props;
    getDataDispatch({ contestId: id });
  };

    setOffersList = () => {
      const array = [];
      const { contestByIdStore: { offers, contestData: { contestType } } } = this.props;

      offers.forEach((offer) => {
        array.push(<OfferBox
          data={offer}
          key={offer.id}
          needButtons={this.needButtons}
          setOfferStatus={this.setOfferStatus}
          contestType={contestType}
          date={new Date()}
        />);
      });

      return array.length !== 0 ? array
        : <div className={styles.notFound}>There is no suggestion at this moment</div>;
    };

    needButtons = (offerStatus) => {
      const {
        contestByIdStore: {
          contestData:
          {
            status: contestStatus,
            User: { id: contestCreatorId },
          },
        },
      } = this.props;
      const { userStore: { data: { id: userId } } } = this.props;

      return (contestCreatorId === userId
          && contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE
          && offerStatus === CONSTANTS.OFFER_STATUS_PENDING);
    };

    setOfferStatus = (creatorId, offerId, command) => {
      const { clearSetOfferStatusErrorDispatch, setOfferStatusDispatch } = this.props;
      clearSetOfferStatusErrorDispatch();
      const { contestByIdStore: { contestData: { id, orderId, priority } } } = this.props;
      const obj = {
        command,
        offerId,
        creatorId,
        orderId,
        priority,
        contestId: id,
      };
      setOfferStatusDispatch(obj);
    };

    findConversationInfo = (interlocutorId) => {
      const { chatStore: { messagesPreview }, userStore: { data: { id } } } = this.props;
      const participants = [id, interlocutorId];
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

    goChat = () => {
      const {
        contestByIdStore: { contestData: { User } },
        goToExpandedDialogDispatch,
      } = this.props;

      goToExpandedDialogDispatch({
        interlocutor: User,
        conversationData: this.findConversationInfo(User.id),
      });
    };

    render() {
      const { userStore: { data }, history } = this.props;
      if (!data?.role) {
        return history.replace('/login');
      }
      const { role } = data;
      const {
        contestByIdStore,
        changeShowImageDispatch,
        changeContestViewModeDispatch,
        getDataDispatch,
        clearSetOfferStatusErrorDispatch,
      } = this.props;
      const {
        isShowOnFull,
        imagePath,
        error,
        isFetching,
        isBrief,
        contestData,
        offers,
        setOfferStatusError,
      } = contestByIdStore;
      return (
        <div>
          {/* <Chat/> */}
          {isShowOnFull && (
            <LightBox
              mainSrc={`${imagePath}`}
              onCloseRequest={() => changeShowImageDispatch(
                { isShowOnFull: false, imagePath: null },
              )}
            />
          )}
          <Header />
          {error && (
          <div className={styles.tryContainer}>
            <TryAgain getData={getDataDispatch} />
          </div>
          )}

          {isFetching ? (
            <div className={styles.containerSpinner}>
              <Spinner />
            </div>
          ) : (
            <div className={styles.mainInfoContainer}>
              <div className={styles.infoContainer}>
                <div className={styles.buttonsContainer}>
                  <span
                    role="button"
                    tabIndex="0"
                    onClick={() => changeContestViewModeDispatch(true)}
                    className={classNames(styles.btn, { [styles.activeBtn]: isBrief })}
                  >
                    Brief
                  </span>
                  <span
                    role="button"
                    tabIndex="0"
                    onClick={() => changeContestViewModeDispatch(false)}
                    className={classNames(styles.btn, { [styles.activeBtn]: !isBrief })}
                  >
                    Offer
                  </span>
                </div>
                {
                    isBrief
                      ? <Brief contestData={contestData} role={role} goChat={this.goChat} />
                      : (
                        <div className={styles.offersContainer}>
                          {
                                  (role === CONSTANTS.CREATOR
                                      && contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE)
                                  && (
                                  <OfferForm
                                    contestType={contestData.contestType}
                                    contestId={contestData.id}
                                    customerId={contestData.User.id}
                                  />
                                  )
                              }
                          {setOfferStatusError && (
                          <Error
                            data={setOfferStatusError.data}
                            status={setOfferStatusError.status}
                            clearError={clearSetOfferStatusErrorDispatch}
                          />
                          )}
                          <div className={styles.offers}>
                            {this.setOffersList()}
                          </div>
                        </div>
                      )
                  }
              </div>
              <ContestSideBar
                contestData={contestData}
                totalEntries={offers.length}
              />
            </div>
          )}

        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getDataDispatch: (data) => dispatch(getContestById(data)),
  setOfferStatusDispatch: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusErrorDispatch: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialogDispatch: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContestDispatch: (data) => dispatch(changeEditContest(data)),
  changeContestViewModeDispatch: (data) => dispatch(changeContestViewMode(data)),
  changeShowImageDispatch: (data) => dispatch(changeShowImage(data)),
});

ContestPage.propTypes = {
  changeEditContestDispatch: PropTypes.func.isRequired,
  getDataDispatch: PropTypes.func.isRequired,
  goToExpandedDialogDispatch: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  changeShowImageDispatch: PropTypes.func.isRequired,
  changeContestViewModeDispatch: PropTypes.func.isRequired,
  clearSetOfferStatusErrorDispatch: PropTypes.func.isRequired,
  setOfferStatusDispatch: PropTypes.func.isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,

  contestByIdStore: PropTypes.shape({
    offers: PropTypes.arrayOf(PropTypes.object).isRequired,
    isBrief: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.shape({}).isRequired,
    imagePath: PropTypes.string.isRequired,
    isShowOnFull: PropTypes.bool.isRequired,

    contestData: PropTypes.shape({
      id: PropTypes.number,
      orderId: PropTypes.number,
      priority: PropTypes.string,
      status: PropTypes.string,
      contestType: PropTypes.string,
      User: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),

    setOfferStatusError: PropTypes.shape({
      data: PropTypes.string,
      status: PropTypes.number,
    }).isRequired,

  }).isRequired,

  userStore: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number,
      role: PropTypes.string,
    }),
  }).isRequired,

  chatStore: PropTypes.shape({
    messagesPreview: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
