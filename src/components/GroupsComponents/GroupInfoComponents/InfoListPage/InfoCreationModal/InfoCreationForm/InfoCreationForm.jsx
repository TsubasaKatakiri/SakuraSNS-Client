import React, { useEffect, useRef, useState } from 'react';
import classes from './InfoCreationForm.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import SimpleButton from '../../../../../MinorComponents/SimpleButton/SimpleButton';
import ManualLoadFileInput from '../../../../../MinorComponents/ManualLoadFileInput/ManualLoadFileInput';
import AttachmentsList from '../../../../../MinorComponents/AttachmentsList/AttachmentsList';
import ValidationTextarea from '../../../../../MinorComponents/ValidationTextarea/ValidationTextarea';
import ValidationField from '../../../../../MinorComponents/ValidationField/ValidationField';

const InfoCreationForm = ({currentUser, token, group, info, createMethod, updateMethod, cancelMethod}) => {
    const [images, setImages] = useState(info ? info.infoBlockImages : []);
    const [newImages, setNewImages] = useState([]);
    const [files, setFiles] = useState([]);
    const fileRef = useRef();

    useEffect(() => {
        return () => {
            setImages([]);
            setNewImages([]);
        }
    }, [])

    const isDark = document.body.classList.contains('dark');

    const removePresentItem = (file) => setImages(images.filter(i => i._id !== file._id));

    const validation = Yup.object({
        infoBlockHeader: Yup.string().required('Event name is required'),
        infoBlockText: Yup.string().required('Event date is required'),
    })

    return (
        <Formik
            initialValues={{
                infoBlockHeader: info ? info.infoBlockHeader : '',
                infoBlockText: info ? info.infoBlockText : '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values) => {
                const readyImages = newImages.map(i => i = i.file._id);
                const infoBlockData = {userId: currentUser._id, infoBlockHeader: values.infoBlockHeader, infoBlockText: values.infoBlockText, infoBlockImages: [...images, ...readyImages]};
                if(!info) createMethod(infoBlockData);
                else updateMethod(infoBlockData);
                setNewImages([]);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.main}>
                    <span className={classes.warning}>Note: Fields marked with * are required.</span>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Info block header <span className={classes.warning}>*</span></h5>
                        <ValidationField name='infoBlockHeader' type='text' placeholder='Info block header...' />
                    </div>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Info block text <span className={classes.warning}>*</span></h5>
                        <ValidationTextarea name='infoBlockText' type='text' placeholder='Info block text...' />
                    </div>
                    {images.length > 0
                        ?   <div className={classes.input}>
                                <h5 className={classes.inputHeader}>Current Images</h5>
                                <AttachmentsList attachments={images} removeItem={removePresentItem}/>
                            </div>
                        : ''
                    }
                    <div className={classes.input}>
                        <div className={classes.inlineControls}>
                            <h5 className={classes.inputHeader}>Add {group ? "New" : ''} Images</h5>
                            <SimpleButton type='button' onClick={()=>fileRef.current.click()}>Add...</SimpleButton>
                        </div>
                        <ManualLoadFileInput currentUser={currentUser} token={token} fileRef={fileRef} files={files} setFiles={setFiles} readyFiles={newImages} setReadyFiles={setNewImages} multiple={true} type={'image'}/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <SimpleButton type='submit'>{info ? 'Update Info' : 'Create Info'}</SimpleButton> 
                    <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default InfoCreationForm;