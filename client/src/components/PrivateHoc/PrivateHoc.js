import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, props) => {
  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: (data) => dispatch(getUserAction(data)),
  });

  class Hoc extends React.Component {
    componentDidMount() {
      const { data, getUser, history } = props;
      if (!data) {
        getUser(history.replace);
      }
    }

    render() {
      const { isFetching, history, match } = this.props;
      return (
        <>
          {isFetching ? <Spinner />
            : <Component history={history} match={match} {...props} />}
        </>
      );
    }
  }

  Hoc.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.shape({}).isRequired,
    getUer: PropTypes.func.isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    match: PropTypes.shape({}).isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
