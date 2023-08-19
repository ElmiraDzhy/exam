import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import {
  getOffersRequest,
  confirmOfferRequest,
  rescindOfferRequest,
} from '../../actions/actionCreator';
import OfferForModerator from './OfferForModerator';
import styles from './ModeratorOfferPage.module.scss';
import ModeratorHeader from './ModeratorHeader';

const ModeratorOfferPage = (props) => {
  const {
    userStore: { data },
    offersReducer: { isFetching, error, offers },
    getOffers,
    confirmOffer,
    rescindOffer,
  } = props;
  const history = useHistory();

  useEffect(() => {
    if (!data || data.role !== 'moderator') {
      history.replace('/login');
    }
    getOffers({ limit: 3 });
  }, []);

  const confirmOfferHandler = (payload) => {
    confirmOffer(payload);
  };

  const rescindOfferHandler = (payload) => {
    rescindOffer(payload);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  const loadMore = (startFrom) => {
    getOffers({
      limit: 3,
      offset: startFrom,
    });
    scrollToBottom();
  };

  return (
    <>
      <ModeratorHeader />
      {
                 data && data.role !== 'moderator' ? <p className={styles['not-found']}>Only for moderator page</p> : (
                   <section className={styles.container}>
                     { isFetching || error || (
                     <>
                       <section>
                         { offers.length === 0 ? <p className={styles['not-found']}> No offers to moderate </p>
                           : offers.map((offer) => {
                             return (
                               <OfferForModerator
                                 key={offer.id}
                                 offer={offer}
                                 confirm={confirmOfferHandler}
                                 rescind={rescindOfferHandler}
                               />
                             );
                           })}
                         {offers.length === 0 || (
                         <button
                           className={styles['load-more-button']}
                           onClick={() => loadMore(offers.length)}
                           type="button"
                         >
                           Load More
                           <img src="/staticImages/load-more.svg" alt="load more button" />
                         </button>
                         )}
                       </section>
                     </>
                     ) }
                   </section>
                 )
            }
      <Footer />
    </>
  );
};

const mapStateToProps = ({ userStore, offersReducer }) => ({ userStore, offersReducer });

const mapDispatchToProps = (dispatch) => ({
  getOffers: (data) => dispatch(getOffersRequest(data)),
  confirmOffer: (data) => dispatch(confirmOfferRequest(data)),
  rescindOffer: (data) => dispatch(rescindOfferRequest(data)),
});

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

  getOffers: PropTypes.func.isRequired,
  confirmOffer: PropTypes.func.isRequired,
  rescindOffer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorOfferPage);
