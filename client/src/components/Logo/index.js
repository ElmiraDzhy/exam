import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';

const Logo = ({ to, alt, ...props }) => (
  <Link to={to}>
    <img {...props} alt={alt} />
  </Link>
);

Logo.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  to: '/',
  src: `${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`,
  alt: 'logo',
  className: null,
};

export default Logo;
