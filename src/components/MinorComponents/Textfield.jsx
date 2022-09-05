import React from 'react';
import classes from './Textfield.module.css';
import {ErrorMessage, useField} from "formik";

const Textfield = (props) => {
    const [field, meta] = useField(props);
    return (
        <div className={classes.inputContainer}>
            <input className={`${classes.input} ${meta.touched && meta.error && classes.inputError}`} {...field} {...props} autoComplete="off"/>
            <ErrorMessage component = "div" name={field.name} className={classes.inputMessage}/>
        </div>
    );
};

export default Textfield;