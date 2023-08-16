import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import CONSTANTS from '../../../../constants';
import {
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  getCatalogList,
} from '../../../../actions/actionCreator';
import styles from './CatalogCreation.module.sass';
import AddToCatalog from '../AddToCatalog/AddToCatalog';
import CreateCatalog from '../CreateCatalog/CreateCatalog';

class CatalogCreation extends React.Component {
  componentDidMount() {
    const { getCatalogListDispatch } = this.props;
    getCatalogListDispatch();
  }

  render() {
    const {
      changeTypeOfChatAddingDispatch, catalogCreationMode,
      changeShowAddChatToCatalogMenuDispatch, isFetching,
    } = this.props;
    const { ADD_CHAT_TO_OLD_CATALOG, CREATE_NEW_CATALOG_AND_ADD_CHAT } = CONSTANTS;
    return (
      <>
        {
          !isFetching
            && (
            <div className={styles.catalogCreationContainer}>
              <i className="far fa-times-circle" onClick={() => changeShowAddChatToCatalogMenuDispatch()} />
              <div className={styles.buttonsContainer}>
                <span
                  role="button"
                  tabIndex="0"
                  onClick={() => changeTypeOfChatAddingDispatch(ADD_CHAT_TO_OLD_CATALOG)}
                  className={classNames({
                    [styles.active]:
                            catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG,
                  })}
                >
                  Old
                </span>
                <span
                  role="button"
                  tabIndex="0"
                  onClick={
                          () => changeTypeOfChatAddingDispatch(CREATE_NEW_CATALOG_AND_ADD_CHAT)
                          }
                  className={classNames({
                    [styles.active]:
                            catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT,
                  })}
                >
                  New
                </span>
              </div>
              {catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT
                ? <CreateCatalog /> : <AddToCatalog />}
            </div>
            )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  changeTypeOfChatAddingDispatch: (data) => dispatch(changeTypeOfChatAdding(data)),
  changeShowAddChatToCatalogMenuDispatch: () => dispatch(changeShowAddChatToCatalogMenu()),
  getCatalogListDispatch: () => dispatch(getCatalogList()),
});

CatalogCreation.propTypes = {
  getCatalogListDispatch: PropTypes.func.isRequired,
  changeTypeOfChatAddingDispatch: PropTypes.func.isRequired,
  catalogCreationMode: PropTypes.string.isRequired,
  changeShowAddChatToCatalogMenuDispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogCreation);
