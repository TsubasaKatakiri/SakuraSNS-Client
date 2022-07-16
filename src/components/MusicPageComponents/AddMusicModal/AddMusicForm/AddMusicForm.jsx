import React, { useRef, useState } from 'react';
import classes from './AddMusicForm.module.scss';
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import ValidationField from '../../../MinorComponents/ValidationField/ValidationField';
import AudiofileInput from '../../../MinorComponents/AudiofileInput/AudiofileInput';
import SimpleButton from '../../../MinorComponents/SimpleButton/SimpleButton';

const AddMusicForm = ({currentUser, group, uploadMethod, cancelMethod}) => {
    const [audiofile, setAudiofile] = useState(null);
    const fileRef = useRef();

    const isDark = document.body.classList.contains('dark');

    const validation = Yup.object({
        name: Yup.string().required('Track name is required'),
        artist: Yup.string().required('Artist name is required'),
    })

    return (
       <Formik
            initialValues={{
                name: '',
                artist: '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values) => {
                let newAudio;
                if(group) newAudio = {uploader: currentUser._id, name: values.name, artist: values.artist, audiofile: audiofile, groupId: group._id}
                else newAudio = {uploader: currentUser._id, name: values.name, artist: values.artist, audiofile: audiofile};
                uploadMethod(newAudio);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.main}>
                    <span className={classes.warning}>Note: Fields marked with * are required.</span>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Track name <span className={classes.warning}>*</span></h5>
                        <ValidationField name='name' type='text'/>
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Track artist <span className={classes.warning}>*</span></h5>
                        <ValidationField name='artist' type='text'/>
                    </div>
                    <div className={classes.controlGroup}>
                        <h5 className={classes.inputHeader}>Audio file <span className={classes.warning}>*</span></h5>
                        <SimpleButton type='button' onClick={() => fileRef.current.click()}>Add file</SimpleButton>
                        <AudiofileInput setAudiofile={setAudiofile} fileRef={fileRef}/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <SimpleButton type='submit' disabled={!audiofile}>Add</SimpleButton>
                    <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default AddMusicForm;