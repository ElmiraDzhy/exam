import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { authActionLogin, clearAuth } from '../../actions/actionCreator';
import styles from './LoginForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';

const LoginForm = (props) => {
  const { authClearDispatch, loginRequestDispatch, history } = props;
  const { auth: { error, isFetching } } = props;
  const { submitting } = props;

  useEffect(() => {
    return () => {
      authClearDispatch();
    };
  }, []);

  const clicked = (values) => {
    loginRequestDispatch({ data: values, history });
  };

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
  };

  return (
    <div className={styles.loginForm}>
      {error && (
      <Error
        data={error.data}
        status={error.status}
        clearError={authClearDispatch}
      />
      )}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={clicked}
        validationSchema={Schems.LoginSchem}
      >
        <Form>
          <FormInput
            classes={formInputClasses}
            name="email"
            type="text"
            label="Email Address"
          />
          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
          />
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching
                ? 'Submitting...'
                : 'LOGIN'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => (
  {
    loginRequestDispatch: ({ data, history }) => dispatch(authActionLogin(data, history)),
    authClearDispatch: () => dispatch(clearAuth()),
  }
);

LoginForm.propTypes = {
  authClearDispatch: PropTypes.func.isRequired,
  loginRequestDispatch: PropTypes.func.isRequired,
  submitting: PropTypes.bool,

  history: PropTypes.shape({

  }).isRequired,

  auth: PropTypes.shape({
    error: PropTypes.shape({
      data: PropTypes.string,
      status: PropTypes.number,
    }),
    isFetching: PropTypes.bool,
  }).isRequired,
};

LoginForm.defaultProps = {
  submitting: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
