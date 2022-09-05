import React, { useRef, useState } from 'react';
import classes from './ImageAddForm.module.scss';
import {Formik, Form} from 'formik';
import SimpleField from '../../../../../MinorComponents/SimpleField/SimpleField';
import SimpleButton from '../../../../../MinorComponents/SimpleButton/SimpleButton';
import AutoloaderInput from '../../../../../MinorComponents/AutoloaderInput/AutoloaderInput';

const ImageAddForm = ({currentUser, group, album, cancelMethod, addMethod}) => {
    const [downloadUrl, setDownloadUrl] = useState('');
    const fileRef = useRef();

    const isDark = document.body.classList.contains('dark');

    const resetImage = () => {
        setDownloadUrl('')
    }

    return (
        <Formik
            initialValues={{
                name: '',
            }}
            onSubmit = {async (values) => {
                const imageData = {name: values.name, imagefile: downloadUrl, uploader: currentUser._id, album: album._id};
                addMethod(imageData);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.main}>
                    <div className={classes.imageContainer}>
                        {downloadUrl === '' 
                            ? <span className={classes.imageMessage}>Your photo for uploading will appear here.</span>
                            : <img src={downloadUrl} className={classes.image} alt=''/>
                        }
                    </div>
                    <div className={classes.controlsContainer}>
                        <span className={classes.warning}>Note: Fields marked with * are required.</span>
                        <div className={classes.input}>
                            <h5 className={classes.inputHeader}>Image name</h5>
                            <SimpleField name='name' type='text' placeholder='Shortly describe your image...'/>
                        </div>
                        <h5 className={classes.inputHeader}>Upload image <span className={classes.warning}>*</span></h5>
                        <div className={classes.buttonBlock}>
                            <SimpleButton type='button' onClick={() => fileRef.current.click()}>Upload Image</SimpleButton>
                            <SimpleButton type='button' disabled = {downloadUrl === ''} onClick={resetImage}>Reset Image</SimpleButton>
                        </div>
                        <AutoloaderInput setDownloadUrl={setDownloadUrl} fileRef={fileRef} type='image'/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <SimpleButton type='submit' disabled={downloadUrl === ''}>Add photo</SimpleButton>
                    <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default ImageAddForm;