import React from 'react';
import classes from './UserInfoSettings.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import ValidationField from './../../../MinorComponents/ValidationField/ValidationField';
import SimpleField from './../../../MinorComponents/SimpleField/SimpleField';
import SimpleTextarea from '../../../MinorComponents/SimpleTextarea/SimpleTextarea';
import SimpleButton from './../../../MinorComponents/SimpleButton/SimpleButton';

const UserInfoSettings = ({profile, currentUser, token, changeSettings}) => {
    const isDark = document.body.classList.contains('dark');

    const validation = Yup.object({
        username: Yup.string().required('User name is required').max(256, 'User name cannot be longer than 256 chars'),
    })

    return (
        <Formik
            initialValues={{
                username: profile.username,
                birthdayDate: profile.birthdayDate ? new Date(profile.birthdayDate).toISOString().split('T')[0] : null,
                description: profile.description
            }}
            validationSchema = {validation}
            onSubmit = {async (values) => {
                const userData = {id: profile._id, username: values.username, birthdayDate: values.birthdayDate, description: values.description};
                changeSettings(currentUser._id, userData, token);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <span className={classes.warning}>Note: Fields marked with * are required.</span>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Username <span className={classes.warning}>*</span></h5>
                    <span className={classes.inputCaption}>Your username will be shown to all users.</span>
                    <ValidationField name='username' type='text' placeholder='User Name'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Birthday Date</h5>
                    <span className={classes.inputCaption}>Set your birthday date here.</span>
                    <SimpleField name='birthdayDate' type='date' placeholder='Birthday Date'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>User Description</h5>
                    <span className={classes.inputCaption}>Leave a short description about yourself.</span>
                    <SimpleTextarea name='description' placeholder='User Description'/>
                </div>
                <SimpleButton type='submit'>Save information</SimpleButton>
            </Form>
        </Formik>
    );
};

export default UserInfoSettings;