import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './EventsPage.module.scss';
import EventProgressElement from './EventProgressElement';

const EventsPage = () => {
  const [events, setEvents] = useState({});

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
    };
    addToLocalStorage(eventData, eventName);
  };

  const initEvents = () => {
    const localStorageEvents = JSON.parse(localStorage.getItem('events'));
    setEvents(localStorageEvents);
  };

  const renderProgressEvents = () => {
    const eventsArray = [];
    Object.keys(events).forEach((event) => {
      eventsArray.push(
        <EventProgressElement
          eventDate={events[event].deadlineDate}
          eventName={event}
          key={eventsArray.length}
          rerender={() => initEvents()}
        />,
      );
    });
    return eventsArray;
  };

  useEffect(() => {
    initEvents();
  }, []);

  return (
    <>
      <Header />
      <section className={styles['events-page-container']}>
        <Formik
          onSubmit={onSubmitHandler}
          initialValues={{
            eventName: '',
            deadlineDate: new Date(),
            reminderDate: new Date(),
          }}
        >
          <Form className={styles['form-container']}>
            <label htmlFor="eventName">
              Event name:
              <input className={styles['input-field']} type="text" name="eventName" id="eventName" />
            </label>
            <label htmlFor="deadlineDate">
              Event deadline date
              <input className={styles['input-field']} type="datetime-local" name="deadlineDate" id="deadlineDate" />
            </label>
            <label htmlFor="reminderDate">
              Event reminder date
              <input className={styles['input-field']} type="datetime-local" name="reminderDate" id="reminderDate" />
            </label>
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
            {Object.keys(events).length === 0 ? 'not found' : renderProgressEvents().sort((a, b) => new Date(a.props.eventDate) - new Date(b.props.eventDate))}
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default EventsPage;
