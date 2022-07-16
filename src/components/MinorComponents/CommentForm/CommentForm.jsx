import React from 'react';
import classes from './CommentForm.module.scss';
import {Formik, Form} from 'formik';
import * as Yup from 'yup'; 
import { Send } from '@material-ui/icons';
import avatar from '../../../images/noAvatar.png';
import ValidationField from './../ValidationField/ValidationField';

const CommentForm = ({currentUser, entryId, commentMethod}) => {
    const isDark = document.body.classList.contains('dark');

    const validation = Yup.object({
        text: Yup.string().required('Please enter a comment'),
    })

    return (
        <Formik
            initialValues={{
                text: ''
            }}
            validationSchema = {validation}
            onSubmit = {(values, {resetForm}) => {
                const comment = {entryId, userId: currentUser._id, text: values.text};
                commentMethod(comment);
                resetForm({values: {
                    text: '',
                }});
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <img src={currentUser.profilePicture ? currentUser.profilePicture : avatar} alt='' className={classes.avatar}/>
                <ValidationField type='text' name='text' placeholder={`What do you think about this, ${currentUser.username}?`}/>
                <button type='submit' className={classes.button}><Send className={classes.buttonIcon}/></button>
            </Form> 
        </Formik>
    );
};

export default CommentForm;