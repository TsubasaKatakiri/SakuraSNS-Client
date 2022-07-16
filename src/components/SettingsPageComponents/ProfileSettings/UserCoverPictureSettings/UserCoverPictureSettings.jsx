import React, { useRef, useState } from 'react';
import classes from './UserCoverPictureSettings.module.scss';
import {Formik, Form} from 'formik';
import blankCover from '../../../../images/noCoverPicture.png';
import AutoloaderInput from '../../../MinorComponents/AutoloaderInput/AutoloaderInput';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';

const UserCoverPictureSettings = ({profile, currentUser, token, changeSettings}) => {
    const [downloadUrl, setDownloadUrl] = useState('');
    const fileRef = useRef();
    const isDark = document.body.classList.contains('dark');

    const resetCurrentAvatar = () => {
        const userData = {id: profile._id, coverPicture: ''};
        changeSettings(currentUser._id, userData, token);
    }

    return (
        <Formik
            initialValues={{
                coverPicture: profile.coverPicture,
            }}
            onSubmit = {async ({resetForm}) => {
                const userData = {id: profile._id, coverPicture: downloadUrl};
                changeSettings(currentUser._id, userData, token);
                resetForm({values: {
                    coverPicture: profile.coverPicture,
                }});
                setDownloadUrl('');
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.image}>
                    <h5 className={classes.imageCaption}>Current user cover picture</h5>
                    <img src={profile.coverPicture ? profile.coverPicture : blankCover} className={classes.imagePreview}/>
                </div>
                <div className={classes.controls}>
                    <SimpleButton type='button' onClick={()=>fileRef.current.click()}>Upload cover</SimpleButton>
                    <AutoloaderInput setDownloadUrl={setDownloadUrl} fileRef={fileRef} type={'image'}/>
                    <SimpleButton type='submit' disabled={downloadUrl === ''}>Save cover</SimpleButton>
                    <SimpleButton type='button' onClick={()=>resetCurrentAvatar()}>Reset cover</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default UserCoverPictureSettings;