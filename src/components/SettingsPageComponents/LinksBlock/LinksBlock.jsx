import React from 'react';
import { HashLink } from 'react-router-hash-link';
import classes from './LinksBlock.module.scss';

const LinksBlock = () => {
    const isDark = document.body.classList.contains('dark');

    return (
        <nav className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.listContainer}>
                <h4 className={classes.listHeader}>Settings categories</h4>
                <ul className={classes.list}>
                    <li className={classes.listItem}>
                        <HashLink smooth to={'/settings#profile'} className={classes.link}>
                            Profile settings
                        </HashLink>
                    </li>
                    <li className={classes.listItem}>
                        <HashLink smooth to={'/settings#content'} className={classes.link}>
                            User content
                        </HashLink>
                    </li>
                    <li className={classes.listItem}>
                        <HashLink smooth to={'/settings#privacy'} className={classes.link}>
                            Privacy
                        </HashLink>
                    </li>
                    <li className={classes.listItem}>
                        <HashLink smooth to={'/settings#account'} className={classes.link}>
                            Account settings
                        </HashLink>
                    </li> 
                </ul>
            </div>
        </nav>
    );
};

export default LinksBlock;