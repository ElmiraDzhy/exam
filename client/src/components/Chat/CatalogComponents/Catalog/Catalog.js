import React from 'react';
import PropTypes from 'prop-types';
import styles from './Catalog.module.sass';

const Catalog = (props) => {
  const { deleteCatalog, goToCatalog } = props;
  const { catalog: { catalogName, chats, id } } = props;
  return (
    <div
      role="button"
      tabIndex="0"
      className={styles.catalogContainer}
      onClick={(event) => goToCatalog(event, props.catalog)}
    >
      <span className={styles.catalogName}>{catalogName}</span>
      <div className={styles.infoContainer}>
        <span>Chats number:  </span>
        <span className={styles.numbers}>{chats && chats.length}</span>
        <i className="fas fa-trash-alt" onClick={(event) => deleteCatalog(event, id)} />
      </div>
    </div>
  );
};

Catalog.propTypes = {
  deleteCatalog: PropTypes.func.isRequired,
  goToCatalog: PropTypes.func.isRequired,
  catalog: PropTypes.shape({
    catalogName: PropTypes.string,
    chats: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
  }).isRequired,
};
export default Catalog;
