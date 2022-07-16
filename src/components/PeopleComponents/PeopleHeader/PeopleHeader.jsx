import React from 'react';
import { Contacts, People } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PeopleSearchForm from '../PeopleSearchForm/PeopleSearchForm';
import classes from './PeopleHeader.module.scss'

const PeopleHeader = ({currentUser, commonMode, friendMode, followerMode, query, setQuery, resetPeople}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.content}>
                <div className={classes.logo}>
                    <People className={classes.logoIcon}/>
                    <h3 className={classes.logoText}>People</h3>
                </div>
                <PeopleSearchForm searchQuery={query} setSearchQuery={setQuery} resetPeople={resetPeople}/>
                <div className={classes.controlGroup}>
                    <Link to={'./'} className={`${classes.control} ${commonMode ? classes.active : ''}`}>
                        <People className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>People</span>
                    </Link>
                    <Link to={`./${currentUser._id}/friends`} className={`${classes.control} ${friendMode ? classes.active : ''}`}>
                        <Contacts className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Followings</span>
                    </Link>
                    <Link to={`./${currentUser._id}/followers`} className={`${classes.control} ${followerMode ? classes.active : ''}`}>
                        <Contacts className={classes.controlIcon}/>
                        <span className={classes.controlCaption}>Followers</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PeopleHeader;