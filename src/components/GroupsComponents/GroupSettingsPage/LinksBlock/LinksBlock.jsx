import React from 'react';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import classes from './LinksBlock.module.scss';

const LinksBlock = () => {
    let groupId = useParams().groupId;
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.listContainer}>
                <h4 className={classes.listHeader}>Settings categories</h4>
                <ul className={classes.list}>
                    <li className={classes.listItem}>
                        <HashLink smooth to={`/groups/${groupId}/settings#info`} className={classes.link}>
                            Info settings
                        </HashLink>
                    </li>
                    <li className={classes.listItem}>
                        <HashLink smooth to={`/groups/${groupId}/settings#policies`} className={classes.link}>
                            Policies settings
                        </HashLink>
                    </li>
                    <li className={classes.listItem}>
                        <HashLink smooth to={`/groups/${groupId}/settings#users`} className={classes.link}>
                            Users controls
                        </HashLink>
                    </li>
                    <li className={classes.listItem}>
                        <HashLink smooth to={`/groups/${groupId}/settings#management`} className={classes.link}>
                            Management
                        </HashLink>
                    </li> 
                </ul>
            </div>
        </div>
    );
};

export default LinksBlock;