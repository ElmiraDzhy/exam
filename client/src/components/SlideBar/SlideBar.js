import React from 'react';
import PropTypes from 'prop-types';
import Flickity from 'react-flickity-component';
import { v4 as uuidv4 } from 'uuid';
import style from './SlideBar.module.sass';
import carouselConstants from '../../carouselConstants';
import './flickity.css';

const SliderBar = (props) => {
  const { carouselType } = props;

  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  };

  const getStyleName = () => {
    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER:
        return style.mainCarousel;
      case carouselConstants.EXAMPLE_SLIDER:
        return style.exampleCarousel;
      case carouselConstants.FEEDBACK_SLIDER:
        return style.feedbackCarousel;
      default:
        return style.mainCarousel;
    }
  };

  const renderSlides = () => {
    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER: {
        return Object.keys(props.images).map((key) => (
          <img
            src={props.images[key]}
            alt="slide"
            key={uuidv4()}
            className={style['carousel-cell']}
          />
        ));
      }
      case carouselConstants.EXAMPLE_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <div className={style['example-cell']} key={uuidv4()}>
            <img src={props.images[key]} alt="slide" />
            <p>{carouselConstants.EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>

        ));
      }
      case carouselConstants.FEEDBACK_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <div className={style['feedback-cell']} key={uuidv4()}>
            <img src={props.images[key]} alt="slide" />
            <p>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].name}</span>
          </div>
        ));
      }
      default:
        return null;
    }
  };
  return (
    <Flickity
      className={getStyleName()}
      elementType="div"
      options={options}
    >
      {
        renderSlides()
      }
    </Flickity>
  );
};

SliderBar.propTypes = {
  carouselType: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
};

export default SliderBar;
