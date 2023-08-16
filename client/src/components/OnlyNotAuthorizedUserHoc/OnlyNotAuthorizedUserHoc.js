import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { onlyForNotAuthorize } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = (Component) => {
  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (data) => dispatch(onlyForNotAuthorize(data)),
  });

  class HocForLoginSignUp extends React.Component {
    componentDidMount() {
      const { checkAuth, history } = this.props;
      checkAuth(history.replace);
    }

    render() {
      const { isFetching, history, data } = this.props;
      if (isFetching) {
        return <Spinner />;
      } if (!data) {
        return <Component history={history} />;
      }
      return null;
    }
  }

  HocForLoginSignUp.propTypes = {
    checkAuth: PropTypes.func.isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: PropTypes.shape({}),
  };

  HocForLoginSignUp.defaultProps = {
    data: {},
  };

  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};

export default OnlyNotAuthorizedUserHoc;
