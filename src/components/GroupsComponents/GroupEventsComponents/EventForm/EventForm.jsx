import React, { useRef, useState } from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { checkPolicy } from '../../../../util/CheckPolicy';
import classes from './EventForm.module.scss';
import AutoloaderInput from '../../../MinorComponents/AutoloaderInput/AutoloaderInput';
import ValidationField from '../../../MinorComponents/ValidationField/ValidationField';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';
import ValidationTextarea from '../../../MinorComponents/ValidationTextarea/ValidationTextarea';

const EventForm = ({currentUser, group, currentEvent, createMethod, updateMethod}) => {
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canSetEvents);
    const isDark = document.body.classList.contains('dark');

    const [eventImage, setEventImage] = useState(currentEvent ? currentEvent.eventImage : '');
    const fileRef = useRef();
    const navigate = useNavigate();

    const validation = Yup.object({
        eventName: Yup.string().required('Event name is required'),
        eventDate: Yup.string().required('Event date is required'),
        eventDescription: Yup.string().required('Event description is required'),
        eventLocation: Yup.string().required('Event location is required'),
    })

    const resetCurrentImage = () => {
        setEventImage('');
    }

    return (
        <Formik
            initialValues={{
                eventName: currentEvent ? currentEvent.eventName : '',
                eventDate: currentEvent ? `${currentEvent.eventDate.slice(0, -8)}` : '',
                eventDescription: currentEvent ? currentEvent.eventDescription : '',
                eventLocation: currentEvent ? currentEvent.eventLocation : '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values) => {
                const eventData = {userId: currentUser._id, eventName: values.eventName, eventDate: values.eventDate, eventDescription: values.eventDescription, eventLocation: values.eventLocation, eventImage: eventImage};
                if(!currentEvent) createMethod(eventData);
                else updateMethod(eventData);
            }}
        >
            <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                {isAllowed 
                ?   <Form className={classes.form}>
                        <span className={classes.warning}>Note: Fields marked with * are required.</span>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Event name <span className={classes.warning}>*</span></h5>
                            <ValidationField name='eventName' type='text' placeholder='Event Name...' />
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Event Date and Time <span className={classes.warning}>*</span></h5>
                            <ValidationField name='eventDate' type='datetime-local'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Event description <span className={classes.warning}>*</span></h5>
                            <ValidationTextarea name='eventDescription' type='text' placeholder='Event description...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Event location <span className={classes.warning}>*</span></h5>
                            <ValidationField name='eventLocation' type='text' placeholder='Event Location...'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Event Image</h5>
                            <div className={classes.imageInput}>
                                <div className={classes.imageContainer}>
                                    {eventImage === '' 
                                        ? <span className={classes.imageMessage}>Your image will appear here.</span>
                                        : <img src={eventImage} className={classes.image} alt=''/>
                                    }
                                </div>
                                <div className={classes.formControls}>
                                    <div className={classes.buttonBlock}>
                                        <SimpleButton type='button' onClick={()=>fileRef.current.click()}>Upload Image</SimpleButton>
                                        <SimpleButton type='button' disabled = {eventImage === ''} onClick={() => resetCurrentImage()}>Reset Image</SimpleButton>
                                    </div>
                                    <AutoloaderInput setDownloadUrl={setEventImage} fileRef={fileRef} type={'image'}/>
                                </div>
                            </div>
                        </div>
                        <SimpleButton type='submit'>{currentEvent ? 'Update Event' : 'Create Event'}</SimpleButton>
                    </Form>
                : <span className={classes.message}>Access forbidden: You are not allowed to access this page.</span>}
                <SimpleButton type='button' onClick={()=>{currentEvent ? navigate(`../${group._id}/event/${currentEvent._id}`) : navigate(`../${group._id}/event`)}}>Cancel</SimpleButton>
            </div>
        </Formik>
    );
};

export default EventForm;