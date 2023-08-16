import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { changeShowModeCatalog, changeRenameCatalogMode, changeCatalogName } from '../../../../actions/actionCreator';
import styles from './CatalogHeader.module.sass';
import FormInput from '../../../FormInput/FormInput';
import Schems from '../../../../validators/validationSchems';

const CatalogListHeader = (props) => {
  const {
    catalogName, changeShowModeCatalogDispatch,
    changeRenameCatalogModeDispatch, isRenameCatalog,
    initialValues,
  } = props;

  const changeCatalogHandler = (values) => {
    const { changeCatalogNameDispatch, id } = props;
    changeCatalogNameDispatch({ catalogName: values.catalogName, catalogId: id });
  };

  return (
    <div className={styles.headerContainer}>
      <i className="fas fa-long-arrow-alt-left" onClick={() => changeShowModeCatalogDispatch()} />
      {!isRenameCatalog && (
      <div className={styles.infoContainer}>
        <span>{catalogName}</span>
        <i className="fas fa-edit" onClick={() => changeRenameCatalogModeDispatch()} />
      </div>
      )}
      {isRenameCatalog && (
      <div className={styles.changeContainer}>
        <Formik
          onSubmit={changeCatalogHandler}
          initialValues={initialValues}
          validationSchema={Schems.CatalogSchema}
        >
          <Form>
            <FormInput
              name="catalogName"
              classes={{
                container: styles.inputContainer,
                input: styles.input,
                warning: styles.fieldWarning,
                notValid: styles.notValid,
              }}
              type="text"
              label="Catalog Name"
            />
            <button type="submit">Change</button>
          </Form>
        </Formik>
      </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { isRenameCatalog } = state.chatStore;
  const { catalogName, id } = state.chatStore.currentCatalog;
  return {
    id,
    catalogName,
    isRenameCatalog,
    initialValues: {
      catalogName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalogDispatch: () => dispatch(changeShowModeCatalog()),
  changeRenameCatalogModeDispatch: () => dispatch(changeRenameCatalogMode()),
  changeCatalogNameDispatch: (data) => dispatch(changeCatalogName(data)),
});

CatalogListHeader.propTypes = {
  id: PropTypes.number.isRequired,
  catalogName: PropTypes.string.isRequired,
  isRenameCatalog: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({}).isRequired,

  changeShowModeCatalogDispatch: PropTypes.func.isRequired,
  changeCatalogNameDispatch: PropTypes.func.isRequired,
  changeRenameCatalogModeDispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogListHeader);
