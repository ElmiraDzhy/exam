import React, {useEffect} from "react";
import {connect} from "react-redux";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {getOffersRequest, confirmOfferRequest, rescindOfferRequest} from '../../actions/actionCreator';
import history from "../../browserHistory";
import OfferForModerator from "./OfferForModerator";


const ModeratorOfferPage = (props) => {

    const {userStore: {data},
        offersReducer: {isFetching, error, offers},
        getOffersRequest,
        confirmOfferRequest,
        rescindOfferRequest} = props;

    useEffect(() => {
        if(data.role !== 'moderator'){
            history.replace('/login');
        }
        getOffersRequest(data);

    }, []);


    const confirmOfferHandler = (data) => {
        confirmOfferRequest(data);
    }

    const rescindOfferHandler = (data) => {
        rescindOfferRequest(data)
    }

    return(
        <>
        <Header/>
            {
                data.role !== 'moderator' ? <p>Only for moderator page</p> : <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 0', width: '100%'}}>
                    { isFetching || <>
                        <p>{offers.map(offer => <OfferForModerator offer={offer} confirm={confirmOfferHandler} rescind={rescindOfferHandler}/>)}</p>
                    </> }
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