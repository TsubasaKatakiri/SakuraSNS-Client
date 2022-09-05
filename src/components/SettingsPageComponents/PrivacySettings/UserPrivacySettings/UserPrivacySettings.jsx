import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import classes from './UserPrivacySettings.module.scss';
import DropdownMenu from '../../../MinorComponents/DropdownMenu/DropdownMenu';
import SimpleButton from './../../../MinorComponents/SimpleButton/SimpleButton';

const UserPrivacySettings = ({currentUser, profile, updateMethod}) => {
    const [canAcceptMessages, setCanAcceptMessages] = useState(profile.userSettings.canAcceptMessages);
    const canAcceptMessagesValues = [{value: 'all', caption: 'All people'}, {value: 'followings', caption: 'Only my followings'}];
    const [canAccessPage, setCanAccessPage] = useState(profile.userSettings.canAccessPage);
    const canAccessPageValues = [{value: 'all', caption: 'All people'}, {value: 'followings', caption: 'Only my followings'}];
    const [canAccessMusic, setCanAccessMusic] = useState(profile.userSettings.canAccessMusic);
    const canAccessMusicValues = [{value: 'all', caption: 'All people'}, {value: 'followings', caption: 'Only my followings'}, {value: 'user', caption: 'Only me'}];
    const [canAccessVideos, setCanAccessVideos] = useState(profile.userSettings.canAccessVideos);
    const canAccessVideosValues = [{value: 'all', caption: 'All people'}, {value: 'followings', caption: 'Only my followings'}, {value: 'user', caption: 'Only me'}];
    const [canAccessAlbums, setCanAccessAlbums] = useState(profile.userSettings.canAccessAlbums);
    const canAccessAlbumsValues = [{value: 'all', caption: 'All people'}, {value: 'followings', caption: 'Only my followings'}, {value: 'user', caption: 'Only me'}];
    const [canAccessFollowers, setCanAccessFollowers] = useState(profile.userSettings.canAccessFollowers);
    const canAccessFollowersValues = [{value: 'all', caption: 'All people'}, {value: 'followings', caption: 'Only my followings'}, {value: 'user', caption: 'Only me'}];
    const [canAccessFollowings, setCanAccessFollowings] = useState(profile.userSettings.canAccessFollowings);
    const canAccessFollowingsValues = [{value: 'all', caption: 'All people'}, {value: 'followings', caption: 'Only my followings'}, {value: 'user', caption: 'Only me'}];
    const [canAccessGroups, setCanAccessGroups] = useState(profile.userSettings.canAccessGroups);
    const canAccessGroupsValues = [{value: 'all', caption: 'All people'}, {value: 'followings', caption: 'Only my followings'}, {value: 'user', caption: 'Only me'}];
    const isDark = document.body.classList.contains('dark');

    return (
        <Formik
            initialValues={{}}
            onSubmit = {async () => {
                const settingsData = {id: currentUser._id, canAcceptMessages: canAcceptMessages, canAccessPage: canAccessPage, canAccessMusic: canAccessMusic, canAccessVideos: canAccessVideos, canAccessAlbums: canAccessAlbums, canAccessFollowers: canAccessFollowers, canAccessFollowings: canAccessFollowings, canAccessGroups: canAccessGroups};
                updateMethod(settingsData);
            }}
        >
            <Form className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Messages acceptance control</h5>
                    <span className={classes.inputCaption}>Choose who can send messages to you.</span>
                    <DropdownMenu name='canAcceptMessages' current={canAcceptMessages} setCurrent={setCanAcceptMessages} values={canAcceptMessagesValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>General page visibility</h5>
                    <span className={classes.inputCaption}>Choose who can see your page.</span>
                    <DropdownMenu name='canAccessPage' current={canAccessPage} setCurrent={setCanAccessPage} values={canAccessPageValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Access to your music page and widget</h5>
                    <span className={classes.inputCaption}>Choose who can access your music page and see music widget on your profile page.</span>
                    <DropdownMenu name='canAccessMusic' current={canAccessMusic} setCurrent={setCanAccessMusic} values={canAccessMusicValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Access to your video page and widget</h5>
                    <span className={classes.inputCaption}>Choose who can access your videos page and see videos widget on your profile page.</span>
                    <DropdownMenu name='canAccessVideos' current={canAccessVideos} setCurrent={setCanAccessVideos} values={canAccessVideosValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Access to your image albums page and widget</h5>
                    <span className={classes.inputCaption}>Choose who can access your image albums page and see albums widget on your profile page.</span>
                    <DropdownMenu name='canAccessAlbums' current={canAccessAlbums} setCurrent={setCanAccessAlbums} values={canAccessAlbumsValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Access to your followers page and widget</h5>
                    <span className={classes.inputCaption}>Choose who can access your followers page and see followers widget on your profile page.</span>
                    <DropdownMenu name='canAccessFollowers' current={canAccessFollowers} setCurrent={setCanAccessFollowers} values={canAccessFollowersValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Access to your followings page and widget</h5>
                    <span className={classes.inputCaption}>Choose who can access your followings page and see followings widget on your profile page.</span>
                    <DropdownMenu name='canAccessFollowings' current={canAccessFollowings} setCurrent={setCanAccessFollowings} values={canAccessFollowingsValues}/>
                </div>
                <div className={classes.input}>
                    <h5 className={classes.inputHeader}>Access to your groups page and widget</h5>
                    <span className={classes.inputCaption}>Choose who can access your groups page and see groups widget on your profile page.</span>
                    <DropdownMenu name='canAccessGroups' current={canAccessGroups} setCurrent={setCanAccessGroups} values={canAccessGroupsValues}/>
                </div>
                <SimpleButton type='submit' className={classes.button}>Save information</SimpleButton>
            </Form>
        </Formik>
    );
};

export default UserPrivacySettings;