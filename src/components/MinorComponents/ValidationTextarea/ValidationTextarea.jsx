import React from 'react';
import classes from './ValidationTextarea.module.scss';
import {ErrorMessage, useField} from 'formik';

const ValidationTextarea = ({inputStyle, errorStyle, messageStyle, ...props}) => {
    const [field, meta] = useField(props);
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.inputContainer} ${isDark ? classes.night : ''}`}>
            <textarea className={`${classes.input} ${meta.touched && meta.error && classes.error}`} {...field} {...props}/>
            <ErrorMessage component = 'div' name={field.name} className={classes.message}/>
        </div>
    );
};

export default ValidationTextarea;