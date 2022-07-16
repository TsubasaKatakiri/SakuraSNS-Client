import React from 'react';
import classes from './SimpleButton.module.scss';

const SimpleButton = ({children, ...props}) => {
    const isDark = document.body.classList.contains('dark');

    return <button {...props} className={`${classes.button} ${isDark ? classes.night : ''}`}>{children}</button>;
};

export default SimpleButton;