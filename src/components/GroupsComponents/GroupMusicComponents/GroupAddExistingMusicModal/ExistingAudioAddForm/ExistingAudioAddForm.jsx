import React, { useState } from 'react';
import classes from './ExistingAudioAddForm.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup'; 
import ValidationField from '../../../../MinorComponents/ValidationField/ValidationField';
import { AudiofileAPI } from '../../../../../api/AudiofileApi';
import SimpleButton from '../../../../MinorComponents/SimpleButton/SimpleButton';

const ExistingAudioAddForm = ({currentUser, group, token, addMethod, cancelMethod}) => {
    const [audioUrl, setAudioUrl] = useState('');
    const [message, setMessage] = useState(null);
    const isDark = document.body.classList.contains('dark');

    const validation = Yup.object({
        audioId: Yup.string().required('Audio ID is required'),
    })

    return (
        <Formik
            initialValues={{
                audioId: '',
            }}
            validationSchema={validation}
            onSubmit = {async (values) => {
                const audioData = {userId: currentUser._id, audioId: values.audioId};
                addMethod(audioData);
            }}
        >
            {(formikProps) => {
                const {values, handleChange} = formikProps;

                const checkAudioId = async () => {
                    try {
                        if(message) setMessage(null);
                        const res = await AudiofileAPI.getOne(values.audioId, token);
                        setAudioUrl(res.audiofile.audiofile)
                    } catch (error) {
                        setMessage('Invalid audio ID');
                    }
                }

                return (
                    <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                        <div className={classes.main}>
                            <div className={classes.audioContainer}>
                                {audioUrl === '' 
                                    ? <span className={classes.audioMessage}>Your selected audio will appear here.</span>
                                    : <audio src={audioUrl} className={classes.audio} controls/>
                                }
                            </div>
                            <div className={classes.controlsContainer}>
                                <span className={classes.warning}>Note: Fields marked with * are required.</span>
                                <div className={classes.input}>
                                    <h5 className={classes.inputHeader}>Audio ID <span className={classes.warning}>*</span></h5>
                                    <ValidationField name='audioId' type='text' placeholder='Audio ID' onChange={handleChange}/>
                                    <SimpleButton type='button' onClick={checkAudioId}>Check ID</SimpleButton>
                                    {message ? <span className={classes.messageStyle}>{message}</span> : ''}
                                </div>
                            </div>
                        </div>
                        <div className={classes.footer}>
                            <SimpleButton type='submit' disabled={audioUrl === ''}>Add track</SimpleButton>
                            <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default ExistingAudioAddForm;