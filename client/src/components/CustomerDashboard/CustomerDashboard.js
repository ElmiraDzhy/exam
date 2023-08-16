import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getContestsForCustomer, clearContestList, setNewCustomerFilter } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

class CustomerDashboard extends React.Component {
  componentDidMount() {
    this.getContests();
  }

  componentDidUpdate(prevProps) {
    const { customerFilter } = this.props;
    if (customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }

  componentWillUnmount() {
    const { clearContestsList } = this.props;
    clearContestsList();
  }

    loadMore = (startFrom) => {
      const { getContests, customerFilter } = this.props;
      getContests({
        limit: 8,
        offset: startFrom,
        contestStatus: customerFilter,
      });
    };

    getContests = () => {
      const { getContests, customerFilter } = this.props;
      getContests({
        limit: 8,
        contestStatus: customerFilter,
      });
    };

    goToExtended = (contestId) => {
      const { history } = this.props;
      history.push(`/contest/${contestId}`);
    };

    setContestList = () => {
      const array = [];
      const { contests } = this.props;

      contests.forEach((contest) => {
        array.push(<ContestBox
          data={contest}
          key={contest.id}
          goToExtended={this.goToExtended}
        />);
      });
      return array;
    };

    tryToGetContest = () => {
      const { clearContestsList, getContests } = this.props;
      clearContestsList();
      getContests();
    };

    render() {
      const {
        error, haveMore, newFilter, isFetching, history, customerFilter,
      } = this.props;

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
                ? <TryAgain getData={this.tryToGetContest} />
                : (
                  <ContestsContainer
                    isFetching={isFetching}
                    loadMore={this.loadMore}
                    history={history}
                    haveMore={haveMore}
                  >
                    {this.setContestList()}
                  </ContestsContainer>
                )
            }
          </div>
        </div>

      );
    }
}

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

  error: PropTypes.shape({}).isRequired,
  haveMore: PropTypes.bool.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

  customerFilter: PropTypes.string.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
