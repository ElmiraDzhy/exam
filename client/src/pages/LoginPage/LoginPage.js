import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo';
import styles from './LoginPage.module.sass';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';

const LoginPage = ({ history }) => (
  <div className={styles.mainContainer}>
    <div className={styles.loginContainer}>
      <div className={styles.headerSignUpPage}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
        <div className={styles.linkLoginContainer}>
          <Link
            to="/registration"
            style={{ textDecoration: 'none' }}
          >
            <span>Signup</span>
          </Link>
        </div>
      </div>
      <div className={styles.loginFormContainer}>
        <LoginForm history={history} />
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearErrorSignUpAndLogin()),
});

LoginPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default connect(null, mapDispatchToProps)(LoginPage);
