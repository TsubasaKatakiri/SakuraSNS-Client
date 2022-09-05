import React, { useState } from 'react';
import classes from './ForgotPasswordForm.module.scss'
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { AuthAPI } from '../../api/AuthApi';
import ValidationField from '../MinorComponents/ValidationField/ValidationField';
import SimpleButton from '../MinorComponents/SimpleButton/SimpleButton';

const ForgotPasswordForm = () => {
    const [message, setMessage] = useState('');

    const validation = Yup.object({
        email: Yup.string().email('Incorrect email').required('Email is required'),
    })

    return (
        <Formik
            initialValues = {{
                email: '',
            }}
            validationSchema = {validation}
            onSubmit = { async (values, {resetForm}) => {
                const {email} = values;
                try {
                    const res = await AuthAPI.forgotPassword(email);
                    setMessage(res.message);
                } catch (err) {
                    setMessage(err.response.data.response.message);
                }
                resetForm({values: {
                    email: '',
                }});
            }}
        >
            {formik => (
                <div className={classes.formWrapper}>
                    <h3 className={classes.header}>Restore your password</h3>
                    <p className={classes.caption}>If you forgot your password, you can recover it here. Just enter your email, click the "Send email" button, and we send you a message on your mail with the password reset link.</p>
                    <span className={classes.errorMessage}>{message}</span>
                    <Form className={classes.form}>
                        <div className={classes.inputBlock}>
                            <ValidationField name='email' type='email' placeholder='Enter your email...'/>
                        </div>
                        <SimpleButton type='submit'>Send email</SimpleButton>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default ForgotPasswordForm;