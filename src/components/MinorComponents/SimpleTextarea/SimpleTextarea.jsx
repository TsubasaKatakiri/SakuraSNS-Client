import React from 'react';
import { useField } from 'formik';
import classes from './SimpleTextarea.module.scss';

const SimpleTextarea = ({...props}) => {
    const [field] = useField(props);
    const isDark = document.body.classList.contains('dark');

    return (
        <textarea className={`${classes.input} ${isDark ? classes.night : ''}`} {...field} {...props}/>
    );
};

export default SimpleTextarea;