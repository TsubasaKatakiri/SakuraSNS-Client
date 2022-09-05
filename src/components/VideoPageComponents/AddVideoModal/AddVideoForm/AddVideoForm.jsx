import React, { useRef, useState } from 'react';
import classes from './AddVideoForm.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup'; 
import ValidationField from '../../../MinorComponents/ValidationField/ValidationField';
import SimpleField from '../../../MinorComponents/SimpleField/SimpleField';
import AutoloaderInput from '../../../MinorComponents/AutoloaderInput/AutoloaderInput';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';

const AddVideoForm = ({currentUser, group, video, addMethod, updateMethod, cancelMethod}) => {
    const [downloadUrl, setDownloadUrl] = useState(video ? video.videofile : '');
    const fileRef = useRef();

    const isDark = document.body.classList.contains('dark');

    const resetVideo = ()=>{
        setDownloadUrl('')
    }

    const validation = Yup.object({
        name: Yup.string().required('Video name is required'),
    })

    return (
        <Formik
            initialValues={{
                name: video ? video.name : '',
                description: video ? video.description : '',
                tags: video ? video.tags : '',
            }}
            validationSchema={validation}
            onSubmit = {async (values) => {
                let videoData;
                if(group) videoData = {name: values.name, videofile: downloadUrl, uploader: currentUser._id, description: values.description, tags: values.tags, groupId: group._id};
                else videoData = {name: values.name, videofile: downloadUrl, uploader: currentUser._id, description: values.description, tags: values.tags};
                if(video) updateMethod(videoData);
                else addMethod(videoData);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.main}>
                    <div className={classes.videoContainer}>
                        {downloadUrl === '' 
                            ? <span className={classes.videoMessage}>Your video for uploading will appear here.</span>
                            : <video src={downloadUrl} className={classes.video} controls/>
                        }
                    </div>
                    <div className={classes.controlsContainer}>
                        <span className={classes.warning}>Note: Fields marked with * are required.</span>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Video name <span className={classes.warning}>*</span></h5>
                            <ValidationField name='name' type='text' placeholder='Video name'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Video description</h5>
                            <SimpleField name='description' type='text' placeholder='Video description'/>
                        </div>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Video tags</h5>
                            <SimpleField name='tags' type='text' placeholder='Video tags'/>
                        </div>
                        <h5 className={classes.inputHeader}>Upload video <span className={classes.warning}>*</span></h5>
                        <div className={classes.buttonBlock}>
                            <SimpleButton type='button' onClick={() => fileRef.current.click()}>Upload Video</SimpleButton>
                            <SimpleButton type='button' disabled = {downloadUrl === ''} onClick={resetVideo}>Cancel</SimpleButton>
                        </div>
                        <AutoloaderInput setDownloadUrl={setDownloadUrl} fileRef={fileRef} type='video'/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <SimpleButton type='submit' disabled={downloadUrl === ''}>{video ? 'Update video' : 'Add Video'}</SimpleButton>
                    <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default AddVideoForm;