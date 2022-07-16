import { CalendarToday } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './BirthdayNotification.module.scss';

const BirthdayNotification = ({birthdays}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.infoTop}>
                <div className={classes.logo}>
                    <CalendarToday className={classes.logoIcon}/>
                    <h3 className={classes.logoCaption}>Birthdays</h3>
                </div>
            </div>
            <div className={classes.infoBottom}>
                <span className={classes.text}>
                    {birthdays.map((user, id) => {
                        return <Link to={`/profile/${user._id}`} className={classes.username} key={user._id}>{user.username}
                        {id !== birthdays.length - 1 ? ', ' : ''}
                        </Link>
                    })}
                &nbsp;has a birthday today.</span>
            </div>
        </div>
    );
};

export default BirthdayNotification;