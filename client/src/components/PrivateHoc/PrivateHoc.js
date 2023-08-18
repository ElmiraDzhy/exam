import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, props) => {
  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: (data) => dispatch(getUserAction(data)),
  });

  const Hoc = (HOCprops) => {
    useEffect(() => {
      const { data, getUser, history } = HOCprops;
      if (!data) {
        getUser(history.replace);
      }
    }, []);

    const { isFetching, history, match } = HOCprops;
    return (
      <>
        {isFetching ? <Spinner />
          : <Component history={history} match={match} {...props} />}
      </>
    );
  };

  Hoc.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.shape({}),
    getUser: PropTypes.func.isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    match: PropTypes.shape({}).isRequired,
  };

  Hoc.defaultProps = {
    data: null,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
