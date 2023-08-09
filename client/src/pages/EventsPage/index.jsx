import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Field, Form, Formik} from "formik";
import styles from './EventsPage.module.scss';

const EventsPage = (props) => {


    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(e)
    }

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
                            <Field className={styles["input-field"]} type={'date'} name={'deadlineDate'}/>
                        <label>Event reminder date</label>
                            <Field className={styles["input-field"]} type={'date'} name={'reminderDate'}/>
                        <button className={styles["submit-button"]} type={'submit'}>Submit</button>
                    </Form>
                </Formik>
            </section>
            <Footer/>
        </>
    )
}

export default EventsPage;