import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Catalog from '../Catalog/Catalog';
import styles from '../CatalogListContainer/CatalogListContainer.module.sass';
import { changeShowModeCatalog, deleteCatalog } from '../../../../actions/actionCreator';

const CatalogList = (props) => {
  const goToCatalog = (event, catalog) => {
    props.changeShowModeCatalog(catalog);
    event.stopPropagation();
  };

  const deleteCatalogHandler = (event, catalogId) => {
    props.deleteCatalog({ catalogId });
    event.stopPropagation();
  };

  const getListCatalog = () => {
    const { chatStore: { catalogList } } = props;
    const elementList = [];
    if (catalogList) {
      catalogList.forEach((catalog) => {
        elementList.push(<Catalog
          catalog={catalog}
          key={catalog.id}
          deleteCatalog={deleteCatalogHandler}
          goToCatalog={goToCatalog}
        />);
      });
    }

    return elementList.length ? elementList : <span className={styles.notFound}>Not found</span>;
  };

  return (
    <div className={styles.listContainer}>
      {getListCatalog()}
    </div>
  );
};

const mapStateToProps = ({ chatStore }) => ({ chatStore });

const mapDispatchToProps = {
  changeShowModeCatalog,
  deleteCatalog,
};

CatalogList.propTypes = {
  changeShowModeCatalog: PropTypes.func.isRequired,
  deleteCatalog: PropTypes.func.isRequired,
  chatStore: PropTypes.shape({
    catalogList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      catalogName: PropTypes.string,
      chats: PropTypes.arrayOf(PropTypes.number),
    })),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogList);
