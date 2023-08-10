import React, { useEffect, useState } from "react";
import styles from './EventProgressElement.module.scss';

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


    return (
        <div className={styles['event-container']}>
            <div className={styles['progress-container']}>
                    <div className={styles['filler']} style={{width: `${progress}%`}}>
                        <span className={styles['progress-label']}>{`${eventName}`}</span>
                    </div>
                <span className={styles['progress-time']}>{`${timeLeft}`}</span>
            </div>
        </div>

    );
};

export default EventProgressElement;