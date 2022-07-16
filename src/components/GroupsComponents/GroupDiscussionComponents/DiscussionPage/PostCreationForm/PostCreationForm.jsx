import React from 'react';
import classes from './PostCreationForm.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import ValidationTextarea from '../../../../MinorComponents/ValidationTextarea/ValidationTextarea';
import SimpleButton from './../../../../MinorComponents/SimpleButton/SimpleButton';

const PostCreationForm = ({currentUser, handleAdd}) => {
    const validation = Yup.object({
        postText: Yup.string().required('Post text is required'),
    })

    return (
        <Formik
            initialValues={{
                postText: '',
            }}
            validationSchema = {validation}
            onSubmit = {async (values, {resetForm}) => {
                const postData = {userId: currentUser._id, postText: values.postText};
                handleAdd(postData);
                resetForm({values: {
                    postText: '',
                }});
            }}
        >
            <Form className={classes.wrapper}>
                <div className={classes.input}>
                    <ValidationTextarea name='postText' type='text' placeholder='Post text...'/>
                </div>
                <SimpleButton type='submit'>Send</SimpleButton>
            </Form>
        </Formik>
    );
};

export default PostCreationForm;