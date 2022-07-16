import React, { useState } from 'react';
import classes from './RegisterForm.module.scss'
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from './../../api/AuthApi';
import ValidationField from '../MinorComponents/ValidationField/ValidationField';
import SimpleButton from './../MinorComponents/SimpleButton/SimpleButton';

const RegisterForm = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validation = Yup.object({
        username: Yup.string().max(64, 'Maximum length: 256 characters').required('Username is required'),
        email: Yup.string().email('Incorrect email').min(4, 'Minimum length: 4 characters').max(128, 'Maximum length: 128 characters').required('Email is required'),
        password: Yup.string().min(6, 'Minimum length: 6 characters').required('Password is required'),
        passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords don\'t match').required('Password confirmation is required'),
    })

    return (
        <Formik
            initialValues = {{
                username: '',
                email: '',
                password: '',
                passwordRepeat: ''
            }}
            validationSchema = {validation}
            onSubmit = { async (values) => {
                const {login, email, password} = values;
                try {
                    await AuthAPI.register(login, email, password);
                    navigate('/register-complete');
                } catch (err) {
                    setError(err.response.data.response.message);
                }
            }}
        >
            {formik => (
                <div className={classes.wrapper}>
                <h3 className={classes.header}>Sign up to the SakuraSNS Project</h3>
                    <span className={classes.errorMessage}>{ error ? `Sign up failed: ${error}` : ''}</span>
                    <Form className={classes.form}>
                        <div className={classes.inputBlock}>
                            <ValidationField name='username' type='text' placeholder='Enter your username...' />
                            <ValidationField name='email' type='email' placeholder='Enter your email...' />
                            <ValidationField name='password' type='password' placeholder='Enter your password...' />
                            <ValidationField name='passwordRepeat' type='password' placeholder='Repeat your password...' />
                        </div>
                        <SimpleButton type='submit'>Sign up</SimpleButton>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default RegisterForm;