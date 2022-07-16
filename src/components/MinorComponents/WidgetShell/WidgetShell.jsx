import React from 'react';
import classes from './WidgetShell.module.scss';

const WidgetShell = ({children}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            {children}
        </div>
    );
};

export default WidgetShell;