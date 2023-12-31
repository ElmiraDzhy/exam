import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './EventsPage.module.scss';
import EventProgressElement from './EventProgressElement';

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');

const currentDate = `${year}-${month}-${day}T${hours}:${minutes}`;
const EventsPage = (props) => {
  const { userStore: { data: { email } } } = props;
  const [events, setEvents] = useState({});
  const [expiredEvents, setExpiredEvents] = useState(0);

  const addToLocalStorage = (eventData, eventName) => {
    const localStorageEvents = JSON.parse(localStorage.getItem('events'));
    localStorageEvents[eventName] = eventData;
    localStorage.setItem('events', JSON.stringify(localStorageEvents));
    setEvents(localStorageEvents);
  };

  const onSubmitHandler = (values) => {
    const { eventName, deadlineDate, reminderDate } = values;
    const eventData = {
      deadlineDate,
      reminderDate,
      email,
    };
    addToLocalStorage(eventData, eventName);
  };

  const countExpired = () => {
    let expired = 0;
    Object.keys(events).forEach((event) => {
      if (events[event]?.email === email
          && new Date(events[event].deadlineDate) < now) {
        expired += 1;
      }
    });
    setExpiredEvents(expired);
  };

  const initEvents = () => {
    const localStorageEvents = JSON.parse(localStorage.getItem('events'));
    setEvents(localStorageEvents);
  };

  const renderProgressEvents = () => {
    const eventsArray = [];
    Object.keys(events).forEach((event) => {
      if (events[event]?.email === email) {
        eventsArray.push(
          <EventProgressElement
            eventDate={events[event].deadlineDate}
            eventName={event}
            key={eventsArray.length}
            rerender={() => initEvents()}
          />,
        );
      }
    });
    return eventsArray;
  };

  useEffect(() => {
    initEvents();
  }, []);

  useEffect(() => {
    countExpired();
  });

  return (
    <>
      <Header />
      <section className={styles['events-page-container']}>
        <Formik
          onSubmit={onSubmitHandler}
          initialValues={{
            eventName: '',
            deadlineDate: currentDate,
            reminderDate: currentDate,
          }}
        >
          <Form className={styles['form-container']}>
            <span>
              Event name:
            </span>
            <Field className={styles['input-field']} type="text" name="eventName" id="eventName" />
            <span>
              Event deadline date:
            </span>
            <Field className={styles['input-field']} type="datetime-local" name="deadlineDate" id="deadlineDate" min={currentDate} />
            <span>
              Event reminder date:
            </span>
            <Field className={styles['input-field']} type="datetime-local" name="reminderDate" id="reminderDate" min={currentDate} />
            <button className={styles['submit-button']} type="submit">Submit</button>
          </Form>
        </Formik>
        <article className={styles['events-progress-container']}>
          <div className={styles['header-progress-container']}>
            <p>Live upcoming checks</p>
            <p>Remaining time</p>
            <img className={styles['event-timer-img']} src="/staticImages/event-timer.svg" alt="event timer" />
          </div>
          <div className={styles['progress-elements-container']}>
            {Object.keys(events).length === 0
              ? <p className={styles['not-found']}>There is no active events</p>
            // eslint-disable-next-line max-len
              : renderProgressEvents().sort((a, b) => new Date(a.props.eventDate) - new Date(b.props.eventDate))}
          </div>
          {expiredEvents > 0
              && (
              <>
                <img className={styles['expired-img']} src="/staticImages/calendar-alert.svg" alt="event timer" />
                <p className={styles['expired-events']}>{`expired events: ${expiredEvents}`}</p>
              </>
              )}
        </article>
      </section>
      <Footer />
    </>
  );
};

EventsPage.propTypes = {
  userStore: PropTypes.shape({
    data: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = ({ userStore }) => ({ userStore });

export default connect(mapStateToProps, null)(EventsPage);
