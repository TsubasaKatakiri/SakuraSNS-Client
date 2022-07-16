import React from 'react';
import classes from './LoginForm.module.scss'
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import ValidationField from '../MinorComponents/ValidationField/ValidationField';
import SimpleButton from '../MinorComponents/SimpleButton/SimpleButton';

const LoginForm = ({onSubmit, error}) => {
    const validation = Yup.object({
        email: Yup.string().email('Incorrect email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    return (
        <Formik
            initialValues = {{
                email: '',
                password: '',
            }}
            validationSchema = {validation}
            onSubmit={async(values) => {
                onSubmit(values)}
            }
        >
            {formik => (
                <div className={classes.wrapper}>
                    <h3 className={classes.header}>Sign in to the Social Network Project</h3>
                    <span className={classes.errorMessage}>{ error ? `Sign in failed: ${error}` : ''}</span>
                    <Form className={classes.form}>
                        <div className={classes.inputBlock}>
                            <ValidationField name='email' type='email' placeholder='Enter your email...' />
                            <ValidationField name='password' type='password' placeholder='Enter your password...' />
                        </div>
                        <SimpleButton className={classes.button} type='submit'>Sign in</SimpleButton>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default LoginForm;