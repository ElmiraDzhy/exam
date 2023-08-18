import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { clearUserError } from '../../actions/actionCreator';
import styles from './UpdateUserInfoForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';
import DragNDropArea from '../DragNDropArea';

const UpdateUserInfoForm = (props) => {
  const {
    onSubmit, submitting, error, clearUserErrorDispatch, initialValues,
  } = props;
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={Schems.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearUserErrorDispatch}
        />
        )}
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <FormInput
            name="lastName"
            type="text"
            label="LastName"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <FormInput
            name="displayName"
            type="text"
            label="Display Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <DragNDropArea name="file" />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const { data, error } = state.userStore;
  return {
    error,
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearUserErrorDispatch: () => dispatch(clearUserError()),
});

UpdateUserInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.shape({
    data: PropTypes.string,
    status: PropTypes.number,
  }),
  clearUserErrorDispatch: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),

};

UpdateUserInfoForm.defaultProps = {
  error: {},
  initialValues: {},
  submitting: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoForm);
