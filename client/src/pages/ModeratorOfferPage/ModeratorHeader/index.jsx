import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ModeratorHeader.module.scss';
import CONSTANTS from '../../../constants';
import { clearUserStore, headerRequest } from '../../../actions/actionCreator';

const ModeratorHeader = (props) => {
  const { clearUserStoreDispatch, history } = props;
  const { data, getUser, isFetching } = props;

  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, []);

  const logOut = () => {
    localStorage.clear();
    clearUserStoreDispatch();
    history.replace('/login');
  };

  const renderLoginButtons = () => {
    if (data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={data.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${data.avatar}`}
              alt="user"
            />
            <span>{`Hi, ${data.displayName}`}</span>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
            <ul>
              <li>
                <Link
                  to="/dashboard"
                  style={{ textDecoration: 'none' }}
                >
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li><Link to="/account" style={{ textDecoration: 'none' }}><span>My Account</span></Link></li>
              <li><Link to="/events" style={{ textDecoration: 'none' }}><span>My Events</span></Link></li>
              <li>
                <Link
                  to="/#"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="/#" style={{ textDecoration: 'none' }}><span>Affiliate Dashboard</span></Link>
              </li>
              <li>
                <span
                  role="button"
                  tabIndex="0"
                  onClick={logOut}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`} className={styles.emailIcon} alt="email" />
        </>
      );
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: 'none' }}><span className={styles.btn}>LOGIN</span></Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span
            className={styles.btn}
          >
            SIGN UP
          </span>
        </Link>
      </>
    );
  };

  if (isFetching) {
    return null;
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.
        </span>
        <a href="/#">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <span>(877)&nbsp;355-3585</span>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Link to="/"><img src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`} className={styles.logo} alt="blue_logo" /></Link>
        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <ul>
              <li>
                <span>NAME IDEAS</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li><a href="/#">Beauty</a></li>
                  <li><a href="/#">Consulting</a></li>
                  <li><a href="/#">E-Commerce</a></li>
                  <li><a href="/#">Fashion & Clothing</a></li>
                  <li><a href="/#">Finance</a></li>
                  <li><a href="/#">Real Estate</a></li>
                  <li><a href="/#">Tech</a></li>
                  <li className={styles.last}>
                    <a href="/#">More Categories</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>CONTESTS</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li><a href="/how-it-works">HOW IT WORKS</a></li>
                  <li><a href="/#">PRICING</a></li>
                  <li><a href="/#">AGENCY SERVICE</a></li>
                  <li><a href="/#">ACTIVE CONTESTS</a></li>
                  <li><a href="/#">WINNERS</a></li>
                  <li><a href="/#">LEADERBOARD</a></li>
                </ul>
              </li>
              <li>
                <span>Our Work</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li><a href="/#">NAMES</a></li>
                  <li><a href="/#">TAGLINES</a></li>
                  <li><a href="/#">LOGOS</a></li>
                  <li className={styles.last}>
                    <a href="/#">TESTIMONIALS</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Names For Sale</span>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
                <ul>
                  <li><a href="/#">POPULAR NAMES</a></li>
                  <li><a href="/#">SHORT NAMES</a></li>
                  <li><a href="/#">INTRIGUING NAMES</a></li>
                  <li><a href="/#">NAMES BY CATEGORY</a></li>
                  <li><a href="/#">VISUAL NAME SEARCH</a></li>
                  <li className={styles.last}>
                    <a href="/#">
                      SELL YOUR
                      DOMAINS
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Blog</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li><a href="/#">ULTIMATE NAMING GUIDE</a></li>
                  <li><a href="/#">POETIC DEVICES IN BUSINESS NAMING</a></li>
                  <li><a href="/#">CROWDED BAR THEORY</a></li>
                  <li className={styles.last}>
                    <a href="/#">ALL ARTICLES</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStoreDispatch: () => dispatch(clearUserStore()),
});

ModeratorHeader.propTypes = {
  isFetching: PropTypes.bool.isRequired,

  getUser: PropTypes.func.isRequired,
  clearUserStoreDispatch: PropTypes.func.isRequired,

  data: PropTypes.shape({
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    role: PropTypes.string,
  }),

  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

ModeratorHeader.defaultProps = {
  data: {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModeratorHeader));
