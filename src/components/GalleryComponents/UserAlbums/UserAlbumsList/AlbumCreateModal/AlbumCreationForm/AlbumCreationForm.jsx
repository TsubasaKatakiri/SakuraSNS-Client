import React from 'react';
import classes from './AlbumCreationForm.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import ValidationField from '../../../../../MinorComponents/ValidationField/ValidationField';
import SimpleButton from '../../../../../MinorComponents/SimpleButton/SimpleButton';

const AlbumCreationForm = ({currentUser, group, album, createMethod, updateMethod, cancelMethod}) => {
    const isDark = document.body.classList.contains('dark');

    const validation = Yup.object({
        name: Yup.string().required('Album name is required'),
    })

    return (
        <Formik
            initialValues={{
                name: album ? album.name : '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values) => {
                let albumData;
                if(group) albumData = {name: values.name, owner: currentUser._id, groupId: group._id};
                else albumData = {name: values.name, owner: currentUser._id};
                if(album) updateMethod(albumData);
                else createMethod(albumData);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.main}>
                    <span className={classes.warning}>Note: Fields marked with * are required.</span>
                    <div className={classes.input}>
                        <h5 className={classes.inputHeader}>Album name <span className={classes.warning}>*</span></h5>
                        <ValidationField name='name' type='text' placeholder='Album Name'/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <SimpleButton type='submit'>{album ? 'Update album' : 'Create album'}</SimpleButton>
                    <SimpleButton type='button' onClick={cancelMethod}>Cancel</SimpleButton>
                </div>
            </Form>
        </Formik>
    );
};

export default AlbumCreationForm;