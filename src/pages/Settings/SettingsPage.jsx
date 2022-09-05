import React, {useEffect} from 'react';
import classes from './SettingsPage.module.scss'
import { changeExtraData, changeExtraSettings, changePassword, changeSettings, getProfile, resetProfile } from '../../redux/Profile/ProfileActions';
import { connect } from 'react-redux';
import LinksBlock from '../../components/SettingsPageComponents/LinksBlock/LinksBlock';
import SettingsRibbon from '../../components/SettingsPageComponents/SettingsRibbon/SettingsRibbon';

const SettingsPage = ({currentUser, token, getProfile, resetProfile, profile, ...props}) => {
    useEffect(() => {
        getProfile(currentUser._id, token);
        return () => resetProfile();
    }, [])

    return(
        <div className={classes.wrapper}>
            <SettingsRibbon currentUser={currentUser} token={token} profile={profile} isFetching={props.isFetching} changeSettings={props.changeSettings} changeExtraSettings={props.changeExtraSettings} changeExtraData={props.changeExtraData} changePassword={props.changePassword}/>
            <LinksBlock/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        isFetching: state.profile.isFetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (userId, token) => {dispatch(getProfile(userId, token))},
        resetProfile: () => {dispatch(resetProfile())},
        changeSettings: (id, userData, token) => {dispatch(changeSettings(id, userData, token))},
        changePassword: (id, passwordData, token) => {dispatch(changePassword(id, passwordData, token))},
        changeExtraData: (id, userData, token) =>{dispatch(changeExtraData(id, userData, token))},
        changeExtraSettings: (id, userSettings, token) =>{dispatch(changeExtraSettings(id, userSettings, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);