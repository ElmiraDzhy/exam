import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CONSTANTS from '../../constants';
import { getDataForContest } from '../../actions/actionCreator';
import styles from './ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import Schems from '../../validators/validationSchems';
import OptionalSelects from '../OptionalSelects/OptionalSelects';

const variableOptions = {
  [CONSTANTS.NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [CONSTANTS.LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

class ContestForm extends React.Component {
  componentDidMount() {
    this.getPreference();
  }

    getPreference = () => {
      const { contestType, getData } = this.props;
      switch (contestType) {
        case CONSTANTS.NAME_CONTEST: {
          getData({
            characteristic1: 'nameStyle',
            characteristic2: 'typeOfName',
          });
          break;
        }
        case CONSTANTS.TAGLINE_CONTEST: {
          getData({ characteristic1: 'typeOfTagline' });
          break;
        }
        case CONSTANTS.LOGO_CONTEST: {
          getData({ characteristic1: 'brandStyle' });
          break;
        }
        default:
      }
    }

    render() {
      const {
        dataForContest: { isFetching, error, data },
        initialValues, handleSubmit, contestType,
        formRef, isEditContest,
      } = this.props;
      if (error) {
        return <TryAgain getData={this.getPreference} />;
      }
      if (isFetching) {
        return <Spinner />;
      }
      return (
        <>
          <div className={styles.formContainer}>
            <Formik
              initialValues={{
                title: '',
                industry: '',
                focusOfWork: '',
                targetCustomer: '',
                file: '',
                ...variableOptions[contestType],
                ...initialValues,
              }}
              onSubmit={handleSubmit}
              validationSchema={Schems.ContestSchem}
              innerRef={formRef}
              enableReinitialize
            >
              <Form>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>Title of contest</span>
                  <FormInput
                    name="title"
                    type="text"
                    label="Title"
                    classes={{
                      container: styles.componentInputContainer,
                      input: styles.input,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <SelectInput
                    name="industry"
                    classes={{
                      inputContainer: styles.selectInputContainer,
                      inputHeader: styles.selectHeader,
                      selectInput: styles.select,
                      warning: styles.warning,
                    }}
                    header="Describe industry associated with your venture"
                    optionsArray={data.industry}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>
                    What does your company / business do?
                  </span>
                  <FormTextArea
                    name="focusOfWork"
                    type="text"
                    label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                    classes={{
                      container: styles.componentInputContainer,
                      inputStyle: styles.textArea,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span className={styles.inputHeader}>
                    Tell us about your customers
                  </span>
                  <FormTextArea
                    name="targetCustomer"
                    type="text"
                    label="customers"
                    classes={{
                      container: styles.componentInputContainer,
                      inputStyle: styles.textArea,
                      warning: styles.warning,
                    }}
                  />
                </div>
                <OptionalSelects {...this.props} />
                <FieldFileInput
                  name="file"
                  classes={{
                    fileUploadContainer: styles.fileUploadContainer,
                    labelClass: styles.label,
                    fileNameClass: styles.fileName,
                    fileInput: styles.fileInput,
                    warning: styles.warning,
                  }}
                  type="file"
                />
                {isEditContest
                  ? <button type="submit" className={styles.changeData}>Set Data</button> : null}
              </Form>
            </Formik>
          </div>
        </>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { isEditContest } = state.contestByIdStore;
  return {
    isEditContest,
    contestStore: state.contestStore,
    dataForContest: state.dataForContest,
    initialValues: ownProps.defaultData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getDataForContest(data)),
});

ContestForm.propTypes = {
  getData: PropTypes.func.isRequired,
  formRef: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  contestType: PropTypes.string.isRequired,

  isEditContest: PropTypes.bool.isRequired,

  initialValues: PropTypes.shape({}).isRequired,
  dataForContest: PropTypes.shape({
    isFetching: PropTypes.bool,
    error: PropTypes.shape({}),
    data: PropTypes.shape({
      industry: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,

};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestForm),
);
