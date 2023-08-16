import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { sendMessageAction } from '../../../../actions/actionCreator';
import styles from './ChatInput.module.sass';
import CONSTANTS from '../../../../constants';
import FormInput from '../../../FormInput/FormInput';
import Schems from '../../../../validators/validationSchems';

const ChatInput = (props) => {
  const submitHandler = (values, { resetForm }) => {
    const { sendMessage, interlocutor } = props;

    sendMessage({
      messageBody: values.message,
      recipient: interlocutor.id,
      interlocutor,
    });
    resetForm();
  };

  return (
    <div className={styles.inputContainer}>
      <Formik
        onSubmit={submitHandler}
        initialValues={{ message: '' }}
        validationSchema={Schems.MessageSchema}
      >
        <Form className={styles.form}>
          <FormInput
            name="message"
            type="text"
            label="message"
            classes={{
              container: styles.container,
              input: styles.input,
              notValid: styles.notValid,
            }}
          />
          <button type="submit">
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}send.png`} alt="send Message" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { interlocutor } = state.chatStore;
  const { data } = state.userStore;
  return { interlocutor, data };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (data) => dispatch(sendMessageAction(data)),
});

ChatInput.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  interlocutor: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
