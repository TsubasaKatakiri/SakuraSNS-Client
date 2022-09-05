import React from 'react';
import classes from './ContentSettings.module.scss';

const ContentSettings = ({currentUser}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <section className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.categoryWrapper}>
                <h4 className={classes.categoryHeader}>Under construction</h4>
            </div>
        </section>
    );
};

export default ContentSettings;