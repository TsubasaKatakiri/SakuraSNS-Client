import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile, resetProfile } from '../../../redux/ProfileReducer';
import { checkUserPrivacy } from '../../../util/CheckUserPrivacy';
import LockPage from '../LockPage/LockPage';
import Preloader from '../Preloader/Preloader';
import classes from './UserPageContainer.module.scss';

const UserPageContainer = ({children, currentUser, token, profile, isFetching, error, getProfile, resetProfile}) => {
    const userId = useParams().userId;

    useEffect(() => {
        getProfile(userId, token);
    }, []);

    if((!profile && !error) || (!profile && isFetching)) return <Preloader/>
    if(!profile && error) {
        return (
            <div className={classes.wrapper}>
                <span className={classes.message}>{error}</span>
            </div>
        )
    }
    if(profile && !checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessPage)) return <LockPage/>

    return (
        <div className={classes.wrapper}>
            {children}
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        isFetching: state.profile.isFetching,
        error: state.profile.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (userId, token) => {dispatch(getProfile(userId, token))},
        resetProfile: () => {dispatch(resetProfile())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageContainer);