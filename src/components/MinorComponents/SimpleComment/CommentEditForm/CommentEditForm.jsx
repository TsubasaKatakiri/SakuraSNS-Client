import React from 'react';
import classes from './CommentEditForm.module.css';
import {Formik, Form} from "formik";
import * as Yup from 'yup'; 
import ValidationField from '../../ValidationField/ValidationField';

const CommentEditForm = ({currentUser, comment, editMethod}) => {
    const validation = Yup.object({
        text: Yup.string().required('Please enter a comment'),
    })

    return (
        <Formik
            initialValues={{
                text: comment.text
            }}
            validationSchema = {validation}
            onSubmit = {(values) => {
                const comment = {userId: currentUser._id, text: values.text};
                editMethod(comment);
            }}
        >
            <Form className={classes.formWrapper}>
                <ValidationField type="text" name="text" placeholder={`Comment text`} inputStyle={classes.inputStyle} errorStyle={classes.errorStyle} messageStyle={classes.messageStyle}/>
                <button type="submit" className={classes.button}>Update</button>
            </Form> 
        </Formik>
    );
};

export default CommentEditForm;