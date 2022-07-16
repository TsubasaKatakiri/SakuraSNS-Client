import React, { useState } from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup'; 
import classes from './ExistingVideoAddForm.module.scss';
import ValidationField from '../../../../MinorComponents/ValidationField/ValidationField';
import { VideofileAPI } from '../../../../../api/VideofileApi';
import SimpleButton from '../../../../MinorComponents/SimpleButton/SimpleButton';

const ExistingVideoAddForm = ({currentUser, group, token, addMethod, cancelMethod}) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [message, setMessage] = useState(null);

    const validation = Yup.object({
        videoId: Yup.string().required('Video ID is required'),
    })


    return (
        <Formik
            initialValues={{
                videoId: '',
            }}
            validationSchema={validation}
            onSubmit = {async (values) => {
                const videoData = {groupId: group._id, userId: currentUser._id, videoId: values.videoId};
                addMethod(videoData);
            }}
        >
            {(formikProps) => {
                const {values, handleChange} = formikProps;

                const checkVideoId = async () => {
                    try {
                        if(message) setMessage(null);
                        const res = await VideofileAPI.getOne(values.videoId, token);
                        setVideoUrl(res.videofile.videofile)
                    } catch (error) {
                        setMessage('Invalid video ID');
                    }
                }

                return (
                    <Form className={classes.wrapper}>
                        <div className={classes.main}>
                            <div className={classes.videoContainer}>
                                {videoUrl === '' 
                                    ? <span className={classes.videoMessage}>Your selected video will appear here.</span>
                                    : <video src={videoUrl} className={classes.video} controls/>
                                }
                            </div>
                            <div className={classes.controlsContainer}>
                                <span className={classes.warning}>Note: Fields marked with * are required.</span>
                                <div className={classes.input}>
                                    <h5 className={classes.inputHeader}>Video ID <span className={classes.warning}>*</span></h5>
                                    <ValidationField name='videoId' type='text' placeholder='Video ID' onChange={handleChange}/>
                                    <SimpleButton type='button' onClick={checkVideoId}>Check ID</SimpleButton>
                                    {message ? <span className={classes.message}>{message}</span> : ''}
                                </div>
                            </div>
                        </div>
                        <div className={classes.footer}>
                            <SimpleButton type='submit' disabled={videoUrl === ''}>Add Video</SimpleButton>
                            <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default ExistingVideoAddForm;