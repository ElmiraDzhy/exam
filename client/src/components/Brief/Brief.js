import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateContest, changeEditContest, clearUpdateContestStore } from '../../actions/actionCreator';
import ContestForm from '../ContestForm/ContestForm';
import styles from './Brief.module.sass';
import ContestInfo from '../Contest/ContestInfo/ContestInfo';
import Error from '../Error/Error';

const Brief = (props) => {
  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', props.contestData.id);
    props.update(data);
  };

  const getContestObjInfo = () => {
    const {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    } = props.contestData;

    const data = {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    };
    const defaultData = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          defaultData[key] = data[key];
        }
      }
    });
    return defaultData;
  };

  const {
    isEditContest,
    contestData,
    role,
    goChat,
    clearUpdateContestStoreDispatch,
    changeEditContestDispatch,
  } = props;
  const { updateContestStore: { error } } = props;
  const { usersStore: { data: { id } } } = props;
  if (!isEditContest) {
    return (
      <ContestInfo
        userId={id}
        contestData={contestData}
        changeEditContest={changeEditContestDispatch}
        role={role}
        goChat={goChat}
      />
    );
  }
  return (
    <div className={styles.contestForm}>
      {
        error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearUpdateContestStoreDispatch}
        />
        )
      }
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isEditContest } = state.contestByIdStore;
  const { updateContestStore, userStore } = state;
  return { updateContestStore, userStore, isEditContest };
};

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(updateContest(data)),
  changeEditContestDispatch: (data) => dispatch(changeEditContest(data)),
  clearUpdateContestStoreDispatch: () => dispatch(clearUpdateContestStore()),
});

Brief.propTypes = {
  isEditContest: PropTypes.bool,

  contestData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    focusOfWork: PropTypes.string,
    industry: PropTypes.string,
    nameVenture: PropTypes.string,
    styleName: PropTypes.string,
    targetCustomer: PropTypes.string,
    title: PropTypes.string,
    brandStyle: PropTypes.string,
    typeOfName: PropTypes.string,
    typeOfTagline: PropTypes.string,
    originalFileName: PropTypes.string,
    contestType: PropTypes.string,
  }).isRequired,

  update: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  goChat: PropTypes.func.isRequired,
  clearUpdateContestStoreDispatch: PropTypes.func.isRequired,
  updateContestStore: PropTypes.shape({
    error: PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      data: PropTypes.object,
      status: PropTypes.number,
    }),
  }).isRequired,

  usersStore: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,

  changeEditContestDispatch: PropTypes.func.isRequired,
};

Brief.defaultProps = {
  isEditContest: false,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Brief));
