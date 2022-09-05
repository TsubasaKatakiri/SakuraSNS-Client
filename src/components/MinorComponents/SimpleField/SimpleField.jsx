import React from 'react';
import {useField} from 'formik';
import classes from './SimpleField.module.scss';

const SimpleField = ({...props}) => {
    const [field] = useField(props);
    const isDark = document.body.classList.contains('dark');

    return <input className={`${classes.input} ${isDark ? classes.night : ''}`} {...field} {...props} autoComplete='off'/>
};

export default SimpleField;