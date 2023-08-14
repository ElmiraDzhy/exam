import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Field, Form, Formik} from "formik";
import styles from './EventsPage.module.scss';
import EventProgressElement from "./EventProgressElement";

const EventsPage = (props) => {

    const [events, setEvents] = useState({});

    const onSubmitHandler = (values, action) => {
        const {eventName, deadlineDate, reminderDate} = values;
        const eventData = {
            deadlineDate,
            reminderDate
        }
        addToLocalStorage(eventData, eventName);
    }

    const addToLocalStorage = (eventData, eventName) => {
        const localStorageEvents = JSON.parse(localStorage.getItem('events'));
        localStorageEvents[eventName] = eventData;
        localStorage.setItem('events', JSON.stringify(localStorageEvents));
        setEvents(localStorageEvents);
    }


    const initEvents = () => {
        const localStorageEvents = JSON.parse(localStorage.getItem('events'));
        setEvents(localStorageEvents)
    }

    const renderProgressEvents = () => {
        const eventsArray = [];
        for(const event in events){
            eventsArray.push(<EventProgressElement eventDate={events[event].deadlineDate} eventName={event} key={eventsArray.length} rerender={() => initEvents()}/>)
        }
        return eventsArray;
    }

    useEffect(() => {
        initEvents()
    }, [])


    return (
        <>
            <Header/>
            <section className={styles['events-page-container']}>
                <Formik
                    onSubmit={onSubmitHandler}
                    initialValues={{
                        eventName: '',
                        deadlineDate: new Date(),
                        reminderDate: new Date(),
                    }}
                >
                    <Form className={styles["form-container"]}>
                        <label>Event name:</label>
                            <Field className={styles["input-field"]} type={'text'} name={'eventName'}/>
                        <label>Event deadline date</label>
                            <Field className={styles["input-field"]} type={'datetime-local'} name={'deadlineDate'}/>
                        <label>Event reminder date</label>
                            <Field className={styles["input-field"]} type={'datetime-local'} name={'reminderDate'}/>
                        <button className={styles["submit-button"]} type={'submit'}>Submit</button>
                    </Form>
                </Formik>
                <article className={styles['events-progress-container']}>
                    <div className={styles['header-progress-container']}>
                        <p>Live upcoming checks</p>
                        <p>Remaining time</p>
                        <img className={styles['event-timer-img']} src={'/staticImages/event-timer.svg'} alt={'event timer picture'}/>
                    </div>
                    <div className={styles['progress-elements-container']}>
                        {Object.keys(events).length === 0 ? 'not found' : renderProgressEvents().sort((a, b) => new Date(a.props.eventDate) - new Date(b.props.eventDate))}
                    </div>
                </article>
            </section>
            <Footer/>
        </>
    )
}

export default EventsPage;