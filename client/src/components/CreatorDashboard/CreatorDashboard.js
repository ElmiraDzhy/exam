import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { v4 as uuidv4 } from 'uuid';
import {
  getContestsForCreative,
  clearContestList,
  setNewCreatorFilter,
  getDataForContest,
} from '../../actions/actionCreator';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';

const types = ['', 'name,tagline,logo', 'name', 'tagline', 'logo', 'name,tagline', 'logo,tagline', 'name,logo'];

class CreatorDashboard extends React.Component {
  componentDidMount() {
    const {
      getDataForContestDispatch, creatorFilter, location: { search }, contests,
    } = this.props;
    getDataForContestDispatch();
    if (this.parseUrlForParams(search) && !contests.length) this.getContests(creatorFilter);
  }

  componentDidUpdate(nextProps) {
    const { location: { search } } = this.props;
    if (nextProps.location.search !== search) {
      this.parseUrlForParams(nextProps.location.search);
    }
  }

  renderSelectType = () => {
    const array = [];
    const { creatorFilter } = this.props;
    types.forEach((el, i) => !i || array.push(<option key={uuidv4()} value={el}>{el}</option>));
    return (
      <select
        onChange={({ target }) => this.changePredicate({
          name: 'typeIndex',
          value: types.indexOf(target.value),
        })}
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  renderIndustryType = () => {
    const { dataForContest, history } = this.props;
    if (!dataForContest?.data) {
      history.replace('/login');
      return null;
    }
    const array = [];
    const { creatorFilter, dataForContest: { data: { industry } } } = this.props;

    array.push(<option key={0} value={null}>Choose industry</option>);
    industry.forEach((industryValue) => array.push(
      <option key={uuidv4()} value={industryValue}>{industryValue}</option>,
    ));

    return (
      <select
        onChange={({ target }) => this.changePredicate({
          name: 'industry',
          value: target.value,
        })}
        value={creatorFilter.industry}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  getContests = (filter) => {
    const { getContestsDispatch } = this.props;
    getContestsDispatch({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  changePredicate = ({ name, value }) => {
    const { creatorFilter, newFilterDispatch } = this.props;
    newFilterDispatch({ [name]: value === 'Choose industry' ? null : value });
    this.parseParamsToUrl({ ...creatorFilter, ...{ [name]: value === 'Choose industry' ? null : value } });
  };

  parseParamsToUrl = (creatorFilter) => {
    const { history } = this.props;
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  parseUrlForParams = (search) => {
    const { creatorFilter } = this.props;
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries: typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, creatorFilter)) {
      const { newFilterDispatch, clearContestsListDispatch } = this.props;
      newFilterDispatch(filter);
      clearContestsListDispatch();
      this.getContests(filter);
      return false;
    } return true;
  };

  getPredicateOfRequest = () => {
    const obj = {};
    const { creatorFilter } = this.props;
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  loadMore = (startFrom) => {
    const { getContestsDispatch } = this.props;
    getContestsDispatch({
      limit: 8,
      offset: startFrom,
      ...this.getPredicateOfRequest(),
    });
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

  goToExtended = (contestId) => {
    const { history } = this.props;
    history.push(`/contest/${contestId}`);
  };

  tryLoadAgain = () => {
    const { clearContestsListDispatch, getContestsDispatch } = this.props;
    clearContestsListDispatch();
    getContestsDispatch({ limit: 8, offset: 0, ...this.getPredicateOfRequest() });
  };

  render() {
    const {
      error, haveMore, creatorFilter, dataForContest: { isFetching }, history,
    } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <span className={styles.headerFilter}>Filter Results</span>
          <div className={styles.inputsContainer}>
            <div
              role="button"
              tabIndex="0"
              onClick={() => this.changePredicate({ name: 'ownEntries', value: !creatorFilter.ownEntries })}
              className={classNames(styles.myEntries,
                { [styles.activeMyEntries]: creatorFilter.ownEntries })}
            >
              My
              Entries
            </div>
            <div className={styles.inputContainer}>
              <span>By contest type</span>
              {this.renderSelectType()}
            </div>
            <div className={styles.inputContainer}>
              <span>By contest ID</span>
              <input
                type="text"
                onChange={({ target }) => this.changePredicate({
                  name: 'contestId',
                  value: target.value,
                })}
                name="contestId"
                value={creatorFilter.contestId}
                className={styles.input}
              />
            </div>
            {!isFetching && (
              <div className={styles.inputContainer}>
                <span>By industry</span>
                {this.renderIndustryType()}
              </div>
            )}
            <div className={styles.inputContainer}>
              <span>By amount award</span>
              <select
                onChange={({ target }) => this.changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })}
                value={creatorFilter.awardSort}
                className={styles.input}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
        {
                    error
                      ? (
                        <div className={styles.messageContainer}>
                          <TryAgain getData={this.tryLoadAgain} />
                        </div>
                      )
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
    );
  }
}

const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  getContestsDispatch: (data) => dispatch(getContestsForCreative(data)),
  clearContestsListDispatch: () => dispatch(clearContestList()),
  newFilterDispatch: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContestDispatch: () => dispatch(getDataForContest()),
});

CreatorDashboard.propTypes = {
  error: PropTypes.shape({}).isRequired,
  haveMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,

  getDataForContestDispatch: PropTypes.func.isRequired,
  getContestsDispatch: PropTypes.func.isRequired,
  clearContestsListDispatch: PropTypes.func.isRequired,

  newFilterDispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string, // ?
  }).isRequired,

  contests: PropTypes.arrayOf(PropTypes.object).isRequired,

  creatorFilter: PropTypes.shape({
    awardSort: PropTypes.string, // ?
    contestId: PropTypes.number,
    typeIndex: PropTypes.number,
    industry: PropTypes.string,
    ownEntries: PropTypes.string, // ?
  }).isRequired,

  dataForContest: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      industry: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,

  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard));
