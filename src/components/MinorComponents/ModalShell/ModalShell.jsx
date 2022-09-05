import React from 'react';
import classes from './ModalShell.module.scss';

const ModalShell = ({handleCancel, caption, children}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={classes.wrapper}>
            <div className={classes.overlay} onClick={handleCancel}/>
            <div className={`${classes.modal} ${isDark ? classes.night : ''}`}>
                <div className={classes.header}>
                    <h3 className={classes.headerText}>{caption}</h3>
                </div>
                <div className={classes.main}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalShell;