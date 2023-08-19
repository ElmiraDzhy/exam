import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
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

const CreatorDashboard = (props) => {
  const {
    getDataForContestDispatch, creatorFilter, location: { search }, contests, history,
  } = props;

  const getContests = (filter) => {
    const { getContestsDispatch } = props;
    getContestsDispatch({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  const parseUrlForParams = (searchValue) => {
    const obj = queryString.parse(searchValue);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries: typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, creatorFilter)) {
      const { newFilterDispatch, clearContestsListDispatch } = props;
      newFilterDispatch(filter);
      clearContestsListDispatch();
      getContests(filter);
      return false;
    } return true;
  };
  useEffect(() => {
    getDataForContestDispatch();
    if (parseUrlForParams(search) && !contests.length) {
      getContests(creatorFilter);
    }
  }, []);

  useEffect(() => {
    parseUrlForParams(search);
  }, [search]);

  const parseParamsToUrl = (creatorFilterValue) => {
    const obj = {};
    Object.keys(creatorFilterValue).forEach((el) => {
      if (creatorFilterValue[el]) obj[el] = creatorFilterValue[el];
    });
    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  const changePredicate = ({ name, value }) => {
    const { newFilterDispatch } = props;
    newFilterDispatch({ [name]: value === 'Choose industry' ? null : value });
    parseParamsToUrl({ ...creatorFilter, ...{ [name]: value === 'Choose industry' ? null : value } });
  };

  const renderSelectType = () => {
    const array = [];
    types.forEach((el, i) => !i || array.push(<option key={array.length} value={el}>{el}</option>));

    return (
      <select
        onChange={({ target }) => changePredicate({
          name: 'typeIndex',
          value: types.indexOf(target.value),
        })}
        value={types[Number(creatorFilter.typeIndex)]}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  const renderIndustryType = () => {
    const { dataForContest } = props;
    if (!dataForContest?.data) {
      history.replace('/login');
      return null;
    }
    const array = [];
    const { dataForContest: { data: { industry } } } = props;

    array.push(<option key={0} value={null}>Choose industry</option>);
    industry.forEach((industryValue) => array.push(
      <option key={array.length} value={industryValue}>{industryValue}</option>,
    ));

    return (
      <select
        onChange={({ target }) => changePredicate({
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

  const getPredicateOfRequest = () => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom) => {
    const { getContestsDispatch } = props;
    getContestsDispatch({
      limit: 8,
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
  };

  const goToExtended = (contestId) => {
    history.push(`/contest/${contestId}`);
  };

  const setContestList = () => {
    const array = [];
    contests.forEach((contest) => {
      array.push(<ContestBox
        data={contest}
        key={contest.id}
        goToExtended={goToExtended}
      />);
    });
    return array;
  };

  const tryLoadAgain = () => {
    const { clearContestsListDispatch, getContestsDispatch } = props;
    clearContestsListDispatch();
    getContestsDispatch({ limit: 8, offset: 0, ...getPredicateOfRequest() });
  };

  const {
    error, haveMore, dataForContest: { isFetching },
  } = props;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            role="button"
            tabIndex="0"
            onClick={() => changePredicate({ name: 'ownEntries', value: !creatorFilter.ownEntries })}
            className={classNames(styles.myEntries,
              { [styles.activeMyEntries]: creatorFilter.ownEntries })}
          >
            My
            Entries
          </div>
          <div className={styles.inputContainer}>
            <span>By contest type</span>
            {renderSelectType()}
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target }) => changePredicate({
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
            {renderIndustryType()}
          </div>
          )}
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) => changePredicate({
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
                          <TryAgain getData={tryLoadAgain} />
                        </div>
                      )
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
  );
};

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
  error: PropTypes.shape({}),
  haveMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,

  getDataForContestDispatch: PropTypes.func.isRequired,
  getContestsDispatch: PropTypes.func.isRequired,
  clearContestsListDispatch: PropTypes.func.isRequired,

  newFilterDispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,

  contests: PropTypes.arrayOf(PropTypes.object).isRequired,

  creatorFilter: PropTypes.shape({
    awardSort: PropTypes.string,
    contestId: PropTypes.string,
    typeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    industry: PropTypes.string,
    ownEntries: PropTypes.bool,
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

CreatorDashboard.defaultProps = {
  error: null,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard));
