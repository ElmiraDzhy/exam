import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastifyCustomStyle.scss';

const GeneralCounter = (props) => {
  const notify = (eventName) => {
    toast.success(`Upcoming event: ${eventName} will start soon.`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
      progressClassName: 'custom-toast-progress',
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!JSON.parse(localStorage.getItem('events'))) {
        localStorage.setItem('events', JSON.stringify({}));
      }

      if (!JSON.parse(localStorage.getItem('eventNamesArray'))) {
        localStorage.setItem('eventNamesArray', JSON.stringify([]));
      }
      const localStoreEvents = JSON.parse(localStorage.getItem('events'));

      if (Object.keys(localStoreEvents).length !== 0) {
        const eventNames = Object.keys(localStoreEvents);
        const arrayForReminderEvents = JSON.parse(localStorage.getItem('eventNamesArray'));

        eventNames.forEach((event) => {
          if (new Date(localStoreEvents[event].reminderDate) < new Date()) {
            if (!arrayForReminderEvents.includes(event)) {
              notify(event);
              arrayForReminderEvents.push(event);
              localStorage.setItem('eventNamesArray', JSON.stringify(arrayForReminderEvents));
            }
          }
        });
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const { children } = props;

  return (
    <>
      {children}
    </>
  );
};

GeneralCounter.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default GeneralCounter;
