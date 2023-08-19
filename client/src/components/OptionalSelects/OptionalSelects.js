import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../constants';
import SelectInput from '../SelectInput/SelectInput';
import FormInput from '../FormInput/FormInput';
import styles from '../ContestForm/ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';

const OptionalSelects = ({
  isFetching,
  contestType,
  dataForContest: {
    data: {
      typeOfName,
      nameStyle,
      brandStyle,
      typeOfTagline,
    },
  },
}) => {
  if (isFetching) {
    return <Spinner />;
  }

  switch (contestType) {
    case CONSTANTS.NAME_CONTEST: {
      return (
        <>
          <SelectInput
            name="typeOfName"
            header="type of company"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={typeOfName}
          />
          <SelectInput
            name="styleName"
            header="Style name"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={nameStyle}
          />
        </>
      );
    }
    case CONSTANTS.LOGO_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="brandStyle"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Brand Style"
            optionsArray={brandStyle}
          />
        </>
      );
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="typeOfTagline"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Type tagline"
            optionsArray={typeOfTagline}
          />
        </>
      );
    }
    default:
      return <Spinner />;
  }
};

OptionalSelects.propTypes = {
  isFetching: PropTypes.bool,
  contestType: PropTypes.string.isRequired,
  dataForContest: PropTypes.shape({
    data: PropTypes.shape({
      typeOfName: PropTypes.arrayOf(PropTypes.string),
      nameStyle: PropTypes.arrayOf(PropTypes.string),
      brandStyle: PropTypes.arrayOf(PropTypes.string),
      typeOfTagline: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

OptionalSelects.defaultProps = {
  isFetching: false,
  dataForContest: {},
};

export default OptionalSelects;
