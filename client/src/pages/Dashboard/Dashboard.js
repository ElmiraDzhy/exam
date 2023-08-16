import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';

const Dashboard = (props) => {
  const { role, history, match } = props;

  useEffect(() => {
    if (role === 'moderator') {
      history.push('/moderatorOffer');
    }
  }, []);

  return (
    <div>
      <Header />
      {
                role === CONSTANTS.CUSTOMER
                  ? <CustomerDashboard history={history} match={match} />
                  : <CreatorDashboard history={history} match={match} />
            }
    </div>
  );
};

const mapStateToProps = (state) => state.userStore.data;

Dashboard.propTypes = {
  role: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Dashboard);
