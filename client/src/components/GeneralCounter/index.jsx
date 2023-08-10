import React, {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GeneralCounter = (props) => {

    const notify = (eventName) => {
        toast.success(`${eventName} time is over`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('events'))){
            console.log('ALREADY EXIST')
        }else{
            console.log('NOT EXIST - MAKING')
            localStorage.setItem('events', JSON.stringify({}))
        }

        if(JSON.parse(localStorage.getItem('eventNamesArray'))){
            console.log('ARRAY OF NAME ALREADY EXIST')
        }else{
            localStorage.setItem('eventNamesArray', JSON.stringify([]));
        }

        const intervalId = setInterval(() => {

            const localStoreEvents = JSON.parse(localStorage.getItem('events'));
            const eventNames = Object.keys(localStoreEvents);

            let arrayForReminderEvents = JSON.parse(localStorage.getItem('eventNamesArray'));

            eventNames.forEach(event => {
                if (new Date(localStoreEvents[event].reminderDate) < new Date()) {
                    if(!arrayForReminderEvents.includes(event)){
                        notify(event);
                        arrayForReminderEvents.push(event);
                        localStorage.setItem('eventNamesArray', JSON.stringify(arrayForReminderEvents));
                    }
                }
            });

            eventNames.forEach(event => {
                if(new Date(localStoreEvents[event].deadlineDate) < new Date()){
                    arrayForReminderEvents = arrayForReminderEvents.filter(item => item!==event);
                    delete localStoreEvents[event];
                    localStorage.setItem('events', JSON.stringify(localStoreEvents));
                    localStorage.setItem('eventNamesArray', JSON.stringify(arrayForReminderEvents));
                }
            })
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <ToastContainer/>
            {props.children}
        </>
        );
}

export default GeneralCounter;