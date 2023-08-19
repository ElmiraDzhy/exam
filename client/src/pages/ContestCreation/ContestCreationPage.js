import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './ContestCreationPage.module.sass';
import { saveContestToStore, clearDataForContest } from '../../actions/actionCreator';
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const ContestCreationPage = (props) => {
  const {
    contestStore: { contests }, bundleStore, contestType, history, title,
  } = props;
  const formRef = useRef();
  const contestData = contests[contestType] ? contests[contestType] : { contestType };

  const handleSubmit = (values) => {
    const { saveContest } = props;
    saveContest({ type: contestType, info: values });
    const route = bundleStore.bundle[props.contestType] === 'payment' ? '/payment' : `${props.bundleStore.bundle[props.contestType]}Contest`;
    history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (!bundleStore.bundle) {
      history.replace('/startContest');
    }
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>
            {title}
          </h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={contestType}
            handleSubmit={handleSubmit}
            formRef={formRef}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contestStore, bundleStore } = state;
  return { contestStore, bundleStore };
};

const mapDispatchToProps = (dispatch) => (
  {
    saveContest: (data) => dispatch(saveContestToStore(data)),
    clearDataForContest: () => dispatch(clearDataForContest()),
  }
);

ContestCreationPage.propTypes = {
  saveContest: PropTypes.func.isRequired,

  contestType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,

  contestStore: PropTypes.shape({
    contests: PropTypes.shape({}),
  }).isRequired,

  bundleStore: PropTypes.shape({
    bundle: PropTypes.shape({}),
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestCreationPage);
