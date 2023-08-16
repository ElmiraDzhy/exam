import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';

const ChatContainer = (props) => {
  const { data } = props;
  return (
    <>
      {data ? <Chat /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};

ChatContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, null)(ChatContainer);
