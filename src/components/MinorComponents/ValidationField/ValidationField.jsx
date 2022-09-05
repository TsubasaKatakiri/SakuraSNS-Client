import React from 'react';
import classes from './ValidationField.module.scss';
import {ErrorMessage, useField} from 'formik';

const ValidationField = ({...props}) => {
    const [field, meta] = useField(props);
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.inputContainer} ${isDark ? classes.night : ''}`}>
            <input className={`${classes.input} ${meta.touched && meta.error && classes.error}`} {...field} {...props} autoComplete='off'/>
            <ErrorMessage component = 'div' name={field.name} className={classes.message}/>
        </div>
    );
};

export default ValidationField;