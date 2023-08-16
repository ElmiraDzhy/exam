import React from 'react';
import PropTypes from 'prop-types';
import styles from './RoleInput.module.sass';

const RoleInput = ({
  label, id, strRole, infoRole, field, type,
}) => (
  <label htmlFor={id}>
    <div className={styles.roleContainer}>
      <input {...field} type={type} id={id} />
      <div className={styles.infoRoleContainer}>
        <span className={styles.role}>{strRole}</span>
        <span className={styles.infoRole}>{infoRole}</span>
      </div>
    </div>
  </label>
);

RoleInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.number.isRequired,
  strRole: PropTypes.string.isRequired,
  infoRole: PropTypes.string.isRequired,
  field: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,

};

RoleInput.defaultProps = {
  label: '',
};

export default RoleInput;
