import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { payRequest, clearPaymentStore } from '../../actions/actionCreator';
import PayForm from '../../components/PayForm/PayForm';
import styles from './Payment.module.sass';
import CONSTANTS from '../../constants';
import Error from '../../components/Error/Error';

const Payment = (props) => {
  const { contestStore: { contests } } = props;

  const pay = (values) => {
    const contestArray = [];
    Object.keys(contests).forEach((key) => contestArray.push(contests[key]));
    const { number, expiry, cvc } = values;
    const data = new FormData();

    contestArray.forEach((contest, i) => {
      data.append('files', contest.file);
      contestArray[i].haveFile = !!contestArray[i].file;
    });

    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', '100');
    props.pay({
      data: {
        formData: data,
      },
      history: props.history,
    });
  };

  const goBack = () => {
    props.history.goBack();
  };

  const { payment: { error }, clearPaymentStoreDispatch } = props;

  if (isEmpty(contests)) {
    props.history.replace('startContest');
  }
  return (
    <div>
      <div className={styles.header}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`} alt="blue-logo" />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.paymentContainer}>
          <span className={styles.headerLabel}>Checkout</span>
          {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearPaymentStoreDispatch}
          />
          )}
          <PayForm sendRequest={pay} back={goBack} isPayForOrder />
        </div>
        <div className={styles.orderInfoContainer}>
          <span className={styles.orderHeader}>Order Summary</span>
          <div className={styles.packageInfoContainer}>
            <span className={styles.packageName}>Package Name: Standard</span>
            <span className={styles.packagePrice}>$100 USD</span>
          </div>
          <div className={styles.resultPriceContainer}>
            <span>Total:</span>
            <span>$100.00 USD</span>
          </div>
          <a href="/#">Have a promo code?</a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
  contestStore: state.contestStore,
});

const mapDispatchToProps = (dispatch) => (
  {
    pay: ({ data, history }) => dispatch(payRequest(data, history)),
    clearPaymentStoreDispatch: () => dispatch(clearPaymentStore()),
  }
);

Payment.propTypes = {
  pay: PropTypes.func.isRequired,
  clearPaymentStoreDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  contestStore: PropTypes.shape({
    contests: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  }).isRequired,
  payment: PropTypes.shape({
    error: PropTypes.shape({
      data: PropTypes.string,
      status: PropTypes.number,
    }),
  }).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
