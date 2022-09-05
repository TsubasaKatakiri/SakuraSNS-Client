import React from 'react';
import classes from './PasswordSettings.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import ValidationField from './../../../MinorComponents/ValidationField/ValidationField';
import SimpleButton from './../../../MinorComponents/SimpleButton/SimpleButton';

const PasswordSettings = ({profile, currentUser, token, changePassword}) => {
    const isDark = document.body.classList.contains('dark');
    
    const validation = Yup.object({
        oldPassword: Yup.string().min(6, 'Minimum length: 6 characters').required('Password is required'),
        newPassword: Yup.string().min(6, 'Minimum length: 6 characters').required('Password is required'),
        newPasswordRepeat: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords don\'t match').required('Password confirmation is required'),
    })

    return (
        <Formik
            initialValues={{
                oldPassword: '',
                newPassword: '',
                newPasswordRepeat: '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values, {resetForm}) => {
                const passwordData = {id: profile._id, oldPassword: values.oldPassword, newPassword: values.newPassword};
                changePassword(currentUser._id, passwordData, token);
                resetForm({values: {
                    oldPassword: '',
                    newPassword: '',
                    newPasswordRepeat: '',
                }});
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <span className={classes.warning}>Note: Fields marked with * are required.</span>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Old password <span className={classes.warning}>*</span></h5>
                    <ValidationField name='oldPassword' type='password' placeholder='Old password...'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>New password <span className={classes.warning}>*</span></h5>
                    <ValidationField name='newPassword' type='password' placeholder='New password...'/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Repeat new password <span className={classes.warning}>*</span></h5>
                    <ValidationField name='newPasswordRepeat' type='password' placeholder='Repeat new password...'/>
                </div>
                <SimpleButton type="submit">Change password</SimpleButton>
            </Form>
        </Formik>
    );
};

export default PasswordSettings;