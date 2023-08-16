import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpdateUserInfoForm from '../UpdateUserInfoForm/UpdateUserInfoForm';
import { updateUserData, changeEditModeOnUserProfile } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';

const UserInfo = (props) => {
  const { isEdit, changeEditMode, data } = props;
  const {
    avatar, firstName, lastName, displayName, email, role, balance,
  } = data;

  const updateUserHandler = (values) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);
    props.updateUser(formData);
  };

  return (
    <div className={styles.mainContainer}>
      {isEdit ? <UpdateUserInfoForm onSubmit={updateUserHandler} />
        : (
          <div className={styles.infoContainer}>
            <img
              src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${avatar}`}
              className={styles.avatar}
              alt="user"
            />
            <div className={styles.infoContainer}>
              <div className={styles.infoBlock}>
                <span className={styles.label}>First Name</span>
                <span className={styles.info}>{firstName}</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.label}>Last Name</span>
                <span className={styles.info}>{lastName}</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.label}>Display Name</span>
                <span className={styles.info}>{displayName}</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.label}>Email</span>
                <span className={styles.info}>{email}</span>
              </div>
              <div className={styles.infoBlock}>
                <span className={styles.label}>Role</span>
                <span className={styles.info}>{role}</span>
              </div>
              {role === CONSTANTS.CREATOR && (
                <div className={styles.infoBlock}>
                  <span className={styles.label}>Balance</span>
                  <span className={styles.info}>{`${balance}$`}</span>
                </div>
              )}
            </div>
          </div>
        )}
      <div
        role="button"
        tabIndex="0"
        onKeyUp="handleKeyUp(event)"
        onClick={() => changeEditMode(!isEdit)}
        className={styles.buttonEdit}
      >
        {isEdit ? 'Cancel' : 'Edit'}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  const { isEdit } = state.userProfile;
  return { data, isEdit };
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => dispatch(updateUserData(data)),
  changeEditMode: (data) => dispatch(changeEditModeOnUserProfile(data)),
});

UserInfo.propTypes = {
  updateUser: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  changeEditMode: PropTypes.func.isRequired,
  data: PropTypes.shape({
    avatar: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    balance: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
