import React from 'react';
import classes from './HidableField.module.scss';
import {useField} from "formik";

const HidableField = ({isVisible, caption, ...props}) => {
    const [field] = useField(props);
    const isDark = document.body.classList.contains('dark');

    if(!isVisible) return '';

    return (
        <div className={`${classes.hidableField} ${isDark ? classes.night : ''}`}>
            <h4 className={classes.hidableFieldHeader}>{caption}</h4>
            <input className={classes.inputStyle} {...field} {...props} autoComplete='off'/>
        </div>
    );
};

export default HidableField;