import React, { useRef, useState } from 'react';
import classes from './UserAvatarSettings.module.scss';
import {Formik, Form} from 'formik';
import avatar from '../../../../images/noAvatar.png';
import AutoloaderInput from '../../../MinorComponents/AutoloaderInput/AutoloaderInput';
import SimpleButton from './../../../MinorComponents/SimpleButton/SimpleButton';

const UserAvatarSettings = ({profile, currentUser, token, changeSettings}) => {
    const [downloadUrl, setDownloadUrl] = useState('');
    const fileRef = useRef();
    const isDark = document.body.classList.contains('dark');

    const resetCurrentAvatar = () => {
        const userData = {id: profile._id, profilePicture: ''};
        changeSettings(currentUser._id, userData, token);
    }

    return (
        <Formik
            initialValues={{
                profilePicture: profile.profilePicture,
            }}
            onSubmit = {async ({resetForm}) => {
                const userData = {id: profile._id, profilePicture: downloadUrl};
                changeSettings(currentUser._id, userData, token);
                resetForm({values: {
                    profilePicture: profile.profilePicture,
                }});
                setDownloadUrl('');
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.image}>
                    <h5 className={classes.imageCaption}>Current user avatar</h5>
                    <img src={profile.profilePicture ? profile.profilePicture : avatar} className={classes.imagePreview}/>
                </div>
                <div className={classes.controls}>
                    <SimpleButton type='button' onClick={() => fileRef.current.click()}>Upload avatar</SimpleButton>
                    <SimpleButton type='submit' disabled={downloadUrl === ''}>Save avatar</SimpleButton>
                    <SimpleButton type='button' onClick={() => resetCurrentAvatar()}>Reset avatar</SimpleButton>
                    <AutoloaderInput setDownloadUrl={setDownloadUrl} fileRef={fileRef} type={'image'}/>
                </div>
            </Form>
        </Formik>
    );
};

export default UserAvatarSettings;