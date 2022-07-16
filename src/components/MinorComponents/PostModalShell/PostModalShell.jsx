import React from 'react';
import classes from './PostModalShell.module.scss';

const PostModalShell = ({handleCancel, children}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={classes.wrapper}>
            <div className={classes.overlay} onClick={handleCancel}/>
            <div className={`${classes.modal} ${isDark ? classes.night : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default PostModalShell;