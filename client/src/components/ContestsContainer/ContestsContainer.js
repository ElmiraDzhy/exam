import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

class ContestsContainer extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

    scrollHandler = () => {
      const { haveMore, loadMore, children } = this.props;
      if (window.innerHeight + document.documentElement.scrollTop
          === document.documentElement.offsetHeight) {
        if (haveMore) {
          loadMore(children.length);
        }
      }
    };

    render() {
      const { isFetching, children } = this.props;
      if (!isFetching && children.length === 0) {
        return <div className={styles.notFound}>Nothing not found</div>;
      } return (
        <div>
          {children}
          {isFetching && <div className={styles.spinnerContainer}><Spinner /></div>}
        </div>
      );
    }
}

ContestsContainer.propTypes = {
  haveMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,

};

export default ContestsContainer;
