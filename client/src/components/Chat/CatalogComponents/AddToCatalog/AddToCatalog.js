import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import SelectInput from '../../../SelectInput/SelectInput';
import { addChatToCatalog } from '../../../../actions/actionCreator';
import styles from './AddToCatalog.module.sass';

const AddToCatalog = (props) => {
  const { catalogList, addChatId } = props;

  const getCatalogsNames = () => {
    const namesArray = [];
    catalogList.forEach((catalog) => {
      namesArray.push(catalog.catalogName);
    });
    return namesArray;
  };

  const getValueArray = () => {
    const valueArray = [];
    catalogList.forEach((catalog) => {
      valueArray.push(catalog.id);
    });
    return valueArray;
  };

  const click = (values) => {
    props.addChatToCatalog({ chatId: addChatId, catalogId: values.catalogId });
  };

  const selectArray = getCatalogsNames();
  return (
    <>
      {selectArray.length !== 0
        ? (
          <Formik onSubmit={click} initialValues={{ catalogId: '' }}>
            <Form className={styles.form}>
              <SelectInput
                name="catalogId"
                header="name of catalog"
                classes={{
                  inputContainer: styles.selectInputContainer,
                  inputHeader: styles.selectHeader,
                  selectInput: styles.select,
                }}
                optionsArray={selectArray}
                valueArray={getValueArray()}
              />
              <button type="submit">Add</button>
            </Form>
          </Formik>
        )
        : <div className={styles.notFound}>You have not created any directories.</div>}

    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  addChatToCatalog: (data) => dispatch(addChatToCatalog(data)),
});

AddToCatalog.propTypes = {
  addChatToCatalog: PropTypes.func.isRequired,
  catalogList: PropTypes.arrayOf(PropTypes.object).isRequired,
  addChatId: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCatalog);
