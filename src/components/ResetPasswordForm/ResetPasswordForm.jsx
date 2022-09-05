import React, { useState } from 'react';
import classes from './ResetPasswordForm.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { AuthAPI } from '../../api/AuthApi';
import ValidationField from '../MinorComponents/ValidationField/ValidationField';
import { useNavigate } from 'react-router-dom';
import SimpleButton from '../MinorComponents/SimpleButton/SimpleButton';

const ResetPasswordForm = ({token}) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validation = Yup.object({
        password: Yup.string().min(6, 'Minimum length: 6 characters').required('Password is required'),
        passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords don\'t match').required('Password confirmation is required'),
    })

    return (
        <Formik
            initialValues = {{
                password: '',
                passwordRepeat: ''
            }}
            validationSchema = {validation}
            onSubmit = { async (values) => {
                const {password} = values;
                try {
                    await AuthAPI.resetPassword(password, token);
                    navigate('/reset-complete');
                } catch (err) {
                    setError(err.response.data.response.message);
                }
            }}
        >
            {formik => (
                <div className={classes.wrapper}>
                    <h3 className={classes.header}>Reset your password</h3>
                    <p className={classes.caption}>Set your new password to continue.</p>
                    <span className={classes.errorMessage}>{error}</span>
                    <Form className={classes.form}>
                        <div className={classes.inputBlock}>
                            <ValidationField name='password' type='password' placeholder='Enter your new password...'/>
                            <ValidationField name='passwordRepeat' type='password' placeholder='Repeat your new password...'/>
                        </div>
                        <SimpleButton type='submit'>Set New Password</SimpleButton>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default ResetPasswordForm;