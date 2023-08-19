import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getContestsForCustomer, clearContestList, setNewCustomerFilter } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

const CustomerDashboard = (props) => {
  const { clearContestsList, customerFilter } = props;

  const getContestsHandler = () => {
    const { getContests } = props;
    getContests({
      limit: 8,
      contestStatus: customerFilter,
    });
  };

  useEffect(() => {
    getContestsHandler();
  }, [customerFilter]);

  useEffect(() => {
    getContestsHandler();
    return () => {
      clearContestsList();
    };
  }, []);

  const loadMore = (startFrom) => {
    const { getContests } = props;
    getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: customerFilter,
    });
  };

  const goToExtended = (contestId) => {
    const { history } = props;
    history.push(`/contest/${contestId}`);
  };

  const setContestList = () => {
    const array = [];
    const { contests } = props;

    contests.forEach((contest) => {
      array.push(<ContestBox
        data={contest}
        key={contest.id}
        goToExtended={goToExtended}
      />);
    });
    return array;
  };

  const tryToGetContest = () => {
    clearContestsList();
    getContestsHandler();
  };

  const {
    error, haveMore, newFilter, isFetching, history,
  } = props;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div
          role="button"
          tabIndex="0"
          onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)}
          className={classNames({
            [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
            [styles.filter]: CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
          })}
        >
          Active Contests
        </div>
        <div
          role="button"
          tabIndex="0"
          onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)}
          className={classNames({
            [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
            [styles.filter]: CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
          })}
        >
          Completed contests
        </div>
        <div
          role="button"
          tabIndex="0"
          onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_PENDING)}
          className={classNames({
            [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
            [styles.filter]: CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
          })}
        >
          Inactive contests
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {
              error
                ? <TryAgain getData={tryToGetContest} />
                : (
                  <ContestsContainer
                    isFetching={isFetching}
                    loadMore={loadMore}
                    history={history}
                    haveMore={haveMore}
                  >
                    {setContestList()}
                  </ContestsContainer>
                )
            }
      </div>
    </div>

  );
};

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) => dispatch(getContestsForCustomer(data)),
  clearContestsList: () => dispatch(clearContestList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

CustomerDashboard.propTypes = {
  isFetching: PropTypes.bool.isRequired,

  clearContestsList: PropTypes.func.isRequired,
  getContests: PropTypes.func.isRequired,
  newFilter: PropTypes.func.isRequired,

  contests: PropTypes.arrayOf(PropTypes.object).isRequired,

  error: PropTypes.shape({}),
  haveMore: PropTypes.bool.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  customerFilter: PropTypes.string.isRequired,

};

CustomerDashboard.defaultProps = {
  error: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
