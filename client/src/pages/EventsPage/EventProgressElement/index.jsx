import React, { useEffect, useState } from 'react';
import styles from './EventProgressElement.module.scss';
import classNames from 'classnames';

const EventProgressElement = (props) => {
    const {  eventDate, eventName } = props;
    const [ progress, setProgress ] = useState( 0 );
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            const end = new Date(eventDate);
            const totalDuration = end - start;
            const currentDuration = now - start;
            const calculatedProgress = (currentDuration / totalDuration) * 100;

            if (calculatedProgress >= 100) {
                clearInterval(interval);
                setProgress(100);
            } else {
                setProgress(calculatedProgress);
            }

            const remainingTime = totalDuration - currentDuration;
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            let formattedTimeLeft = '';
            if (days > 0) {
                formattedTimeLeft += `${days}d `;
            }
            formattedTimeLeft += `${hours}h ${minutes}m ${seconds}s`;
            setTimeLeft(formattedTimeLeft);

        }, 1000);

        return () => clearInterval(interval);
    }, [eventDate]);

    const classNameEventContainer = classNames(styles['event-container'], {
        [styles['expired']]: progress === 100 || progress < 0,
    })

    const onClickHandler = () => {
        let arrayForReminderEvents = JSON.parse(localStorage.getItem('eventNamesArray'));
        arrayForReminderEvents = arrayForReminderEvents.filter(item => item !== eventName);

        const localStoreEvents = JSON.parse(localStorage.getItem('events'));
        delete localStoreEvents[eventName];

        localStorage.setItem('events', JSON.stringify(localStoreEvents));
        localStorage.setItem('eventNamesArray', JSON.stringify(arrayForReminderEvents));

        props.rerender();
    }

    return (
        <article className={styles['progress-element-wrapper']}>
            <div className={classNameEventContainer}>
                <div className={styles['progress-container']}>
                        <div className={styles['filler']} style={{width: `${progress}%`}}>
                            <span className={styles['progress-label']}>{`${eventName}`}</span>
                        </div>
                    <span className={styles['progress-time']}>{`${ progress === 100 || progress < 0 ? 'expired' : timeLeft}`}</span>
                </div>
            </div>
            <button className={styles['delete-event-btn']} onClick={onClickHandler}>
               <img src={'/staticImages/deleteEvent.svg'} alt={'delete event'}/>
            </button>
        </article>


    );
};

export default EventProgressElement;