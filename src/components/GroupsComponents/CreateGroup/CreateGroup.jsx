import React from 'react';
import classes from './CreateGroup.module.scss'
import { ChevronLeft, Create } from '@material-ui/icons';
import GroupCreationForm from './GroupCreationForm/GroupCreationForm';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CreateGroup = ({currentUser, token}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.header}>
                    <div className={classes.logo}>
                        <Create className={classes.logoIcon}/>
                        <h3 className={classes.logoText}>Create New Group</h3>
                    </div>
                    <div className={classes.controlGroup}>
                        <Link to={`/groups`} className={classes.control}>
                            <ChevronLeft className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>To groups list</span>
                        </Link>
                    </div>
                </div>
                <GroupCreationForm currentUser={currentUser} token={token}/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(CreateGroup);