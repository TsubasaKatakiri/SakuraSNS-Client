import React, { useEffect } from 'react';
import classes from './UserBlacklistSettings.module.scss';
import { blacklistAdd, blacklistRemove, getBlacklist, resetBlacklist } from '../../../../../redux/Blacklist/BlacklistActions';
import UserBlacklistAdd from '../UserBlacklistAdd/UserBlacklistAdd';
import Preloader from './../../../../MinorComponents/Preloader/Preloader';
import { connect } from 'react-redux';
import UserBlacklist from '../UserBlacklist/UserBlacklist';

const UserBlacklistSettings = ({currentUser, token, blacklist, isFetching, error, getBlacklist, blacklistAdd, ...props}) => {
    const isDark = document.body.classList.contains('dark');

    useEffect(() => {
        getBlacklist(currentUser._id, token);
        return () => props.resetBlacklist();
    }, []);

    const addMethod = (id) => {
        blacklistAdd(id, currentUser._id, token);
    };

    const removeMethod = (id) => {
        console.log(id);
        props.blacklistRemove(id, currentUser._id, token);
    };

    if(!blacklist && error) return <span className={classes.message}>{error}</span>
    if(!blacklist || isFetching) return <Preloader/>

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.category}>
                <h4 className={classes.categoryHeader}>User blacklist settings</h4>
                <span className={classes.categoryCaption}>You can manage your user blacklist here.</span>
                <UserBlacklistAdd isDark={isDark} addMethod={addMethod} errorAdd={props.errorAdd}/>
                {blacklist.length > 0 
                    ? <UserBlacklist removeMethod={removeMethod} blacklist={blacklist} isDark={isDark}/>
                    : ''
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        blacklist: state.blacklist.blacklist,
        isFetching: state.blacklist.isFetching,
        error: state.blacklist.error,
        errorAdd: state.blacklist.errorAdd,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBlacklist: (userId, token) => {dispatch(getBlacklist(userId, token))},
        blacklistAdd: (blacklistUserId, userId, token) => {dispatch(blacklistAdd(blacklistUserId, userId, token))},
        blacklistRemove: (blacklistUserId, userId, token) => {dispatch(blacklistRemove(blacklistUserId, userId, token))},
        resetBlacklist: () => {dispatch(resetBlacklist())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBlacklistSettings);