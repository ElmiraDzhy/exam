import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { getOffersRequest, confirmOfferRequest, rescindOfferRequest } from '../../actions/actionCreator';
import OfferForModerator from './OfferForModerator';
import styles from './ModeratorOfferPage.module.scss';

const ModeratorOfferPage = (props) => {
  const {
    userStore: { data },
    offersReducer: { isFetching, error, offers },
  } = props;
  const history = useHistory();

  useEffect(() => {
    if (!data || data.role !== 'moderator') {
      history.replace('/login');
    }
    getOffersRequest({ limit: 3 });
  }, []);

  const confirmOfferHandler = (payload) => {
    confirmOfferRequest(payload);
  };

  const rescindOfferHandler = (payload) => {
    rescindOfferRequest(payload);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadMore = (startFrom) => {
    getOffersRequest({
      limit: 3,
      offset: startFrom,
    });
    scrollToBottom();
  };

  return (
    <>
      <section className={styles['header-container']}>
        <div className={styles['fixed-header']}>
          <span
            className={styles.info}
          >
            Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.
          </span>
          <button type="button">Read Announcement</button>
        </div>
      </section>
      {
                 data && data.role !== 'moderator' ? <p>Only for moderator page</p> : (
                   <section className={styles.container}>
                     { isFetching || error || (
                     <>
                       <section>
                         {
                               offers.map((offer) => {
                                 return (
                                   <OfferForModerator
                                     key={offer.id}
                                     offer={offer}
                                     confirm={confirmOfferHandler}
                                     rescind={rescindOfferHandler}
                                   />
                                 );
                               })
                           }
                       </section>
                     </>
                     ) }
                     <button
                       className={styles['load-more-button']}
                       onClick={() => loadMore(offers.length)}
                       type="button"
                     >
                       Load More
                       <img src="/staticImages/load-more.svg" alt="load more button" />
                     </button>
                   </section>
                 )
            }
      <Footer />
    </>
  );
};

const mapStateToProps = ({ userStore, offersReducer }) => ({ userStore, offersReducer });
const mapDispatchToProps = {
  getOffersRequest,
  confirmOfferRequest,
  rescindOfferRequest,
};

ModeratorOfferPage.propTypes = {
  userStore: PropTypes.shape({
    data: PropTypes.shape({
      role: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  offersReducer: PropTypes.shape({
    isFetching: PropTypes.bool,
    error: PropTypes.shape({}),
    offers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorOfferPage);
