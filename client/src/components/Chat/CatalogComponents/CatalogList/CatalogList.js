import React from 'react';
import { connect } from 'react-redux';
import Catalog from '../Catalog/Catalog';
import styles from '../CatalogListContainer/CatalogListContainer.module.sass';
import { changeShowModeCatalog, deleteCatalog } from '../../../../actions/actionCreator';

const CatalogList = (props) => {
  const goToCatalog = (event, catalog) => {
    props.changeShowModeCatalog(catalog);
    event.stopPropagation();
  };

  const deleteCatalog = (event, catalogId) => {
    props.deleteCatalog({ catalogId });
    event.stopPropagation();
  };

  const getListCatalog = () => {
    const { chatStore: { catalogList } } = props;
    const elementList = [];
    catalogList && catalogList.forEach((catalog) => {
      elementList.push(<Catalog
        catalog={catalog}
        key={catalog.id}
        deleteCatalog={deleteCatalog}
        goToCatalog={goToCatalog}
      />);
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(CatalogList);
