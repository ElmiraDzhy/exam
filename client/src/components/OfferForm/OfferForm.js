import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import CONSTANTS from '../../constants';
import { setOffer, clearAddOfferError } from '../../actions/actionCreator';
import styles from './OfferForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';
import DragNDropArea from '../DragNDropArea';

const OfferForm = (props) => {
  const {
    addOfferError, clearOfferError, contestType, contestId, customerId,
  } = props;

  const renderOfferInput = () => {
    if (contestType === CONSTANTS.LOGO_CONTEST) {
      return (
        <DragNDropArea name="offerData" />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );
  };

  const setOfferHandler = (values, { resetForm }) => {
    props.clearOfferError();
    const data = new FormData();
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    props.setNewOffer(data);
    resetForm();
  };

  const validationSchema = contestType === CONSTANTS.LOGO_CONTEST
    ? Schems.LogoOfferSchema
    : Schems.TextOfferSchema;

  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={setOfferHandler}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}

          <button
            type="submit"
            className={styles.btnOffer}
          >
            Send Offer
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setNewOffer: (data) => dispatch(setOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
});

const mapStateToProps = (state) => {
  const { addOfferError } = state.contestByIdStore;
  return { addOfferError };
};

OfferForm.propTypes = {
  clearOfferError: PropTypes.func.isRequired,
  setNewOffer: PropTypes.func.isRequired,

  contestId: PropTypes.number.isRequired,
  customerId: PropTypes.number.isRequired,
  contestType: PropTypes.string.isRequired,

  addOfferError: PropTypes.shape({
    data: PropTypes.string,
    status: PropTypes.number,
  }),
};

OfferForm.defaultProps = {
  addOfferError: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
