import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chat from '../Chat/Chat';

const ChatContainer = (props) => {
  const { data } = props;
  return (
    <>
      {data && data.role !== 'moderator' ? <Chat /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  return { data };
};

ChatContainer.propTypes = {
  data: PropTypes.shape({
    role: PropTypes.string,
  }),
};

ChatContainer.defaultProps = {
  data: null,
};

export default connect(mapStateToProps, null)(ChatContainer);
