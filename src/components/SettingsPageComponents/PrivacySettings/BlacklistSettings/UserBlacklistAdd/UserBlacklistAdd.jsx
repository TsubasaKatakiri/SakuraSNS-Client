import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import classes from './UserBlacklistAdd.module.scss';
import ValidationField from '../../../../MinorComponents/ValidationField/ValidationField';
import SimpleButton from './../../../../MinorComponents/SimpleButton/SimpleButton';

const UserBlacklistAdd = ({isDark, addMethod, errorAdd}) => {
    const validation = Yup.object({
        userId: Yup.string().required('User ID is required'),
    })

    return (
        <Formik
            initialValues={{
                userId: '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values) => {
                addMethod(values.userId);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                {errorAdd ? <span className={classes.message}>{errorAdd}</span> : ''}
                <span className={classes.warning}>Note: Fields marked with * are required.</span>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>User ID <span className={classes.warning}>*</span></h5>
                    <span className={classes.inputCaption}>You can add user to the blacklist here. Blacklisted user cannot access your profile and affiliated pages and send you any messages.</span>
                    <ValidationField name='userId' type='text' placeholder='User ID'/>
                </div>
                <SimpleButton type='submit'>Add to blacklist</SimpleButton>
            </Form>
        </Formik>
    );
};

export default UserBlacklistAdd;