import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Footer from '../../components/Footer/Footer';
import {getOffersRequest, confirmOfferRequest, rescindOfferRequest} from '../../actions/actionCreator';
import OfferForModerator from './OfferForModerator';
import styles from './ModeratorOfferPage.module.scss';

import {useHistory} from "react-router-dom";
const ModeratorOfferPage = (props) => {

    const {userStore: {data},
        offersReducer: {isFetching, error, offers},
        getOffersRequest,
        confirmOfferRequest,
        rescindOfferRequest} = props;
    const history = useHistory();

    useEffect(() => {
        if(!data || data.role !== 'moderator'){
            history.replace('/login');
        }
        getOffersRequest({ limit: 3});

    },[]);

    const confirmOfferHandler = (data) => {
        confirmOfferRequest(data);
    }

    const rescindOfferHandler = (data) => {
        rescindOfferRequest(data)
    }

    const  loadMore = (startFrom) => {
        getOffersRequest({
            limit: 3,
            offset: startFrom,
        });
        scrollToBottom();
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    };

    return(
        <>
            <section className={styles['header-container']}>
                <div className={styles['fixed-header']}>
                    <span className={styles['info']}>Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.</span>
                    <a href="#">Read Announcement</a>
                </div>
            </section>
            {
                 data && data.role !== 'moderator' ? <p>Only for moderator page</p> : <section className={styles.container}>
                    { isFetching || error || <>
                        <section>{offers.map(offer => <OfferForModerator key={offer.id} offer={offer} confirm={confirmOfferHandler} rescind={rescindOfferHandler}/>)}</section>
                    </> }
                    <button className={styles['load-more-button']} onClick={() => loadMore(offers.length)}>Load More <img src={'/staticImages/load-more.svg'} alt={'load more button'}/></button>
                </section>
            }
        <Footer/>
        </>
    )
}

const mapStateToProps = ({userStore, offersReducer}) => ({userStore, offersReducer});
const mapDispatchToProps = {
    getOffersRequest,
    confirmOfferRequest,
    rescindOfferRequest
}
export default connect(mapStateToProps, mapDispatchToProps)(ModeratorOfferPage);