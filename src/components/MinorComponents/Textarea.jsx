import React from 'react';
import classes from './Textarea.module.css';
import {useField} from "formik";

const Textarea = (props) => {
    const [field, meta] = useField(props);
    return (
        <div className={classes.textareaContainer}>
            <textarea className={classes.textarea} {...field} {...props}/>
        </div>
    );
};

export default Textarea;