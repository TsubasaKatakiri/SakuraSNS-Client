import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './VideoGallery.module.scss';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import VideoUploadedList from '../VideoUploadedList/VideoUploadedList';
import VideoFavoriteList from '../VideoFavoriteList/VideoFavoriteList';
import { checkUserPrivacy } from '../../../../util/CheckUserPrivacy';
import LockPage from '../../../MinorComponents/LockPage/LockPage';
import VideoGalleryHeader from '../VideoGalleryHeader/VideoGalleryHeader';
import UserPageContainer from '../../../MinorComponents/UserPageContainer/UserPageContainer';

const VideoGallery = ({currentUser, profile}) => {
    const isDark = document.body.classList.contains('dark');
    const userId = useParams().userId;
    const [uploadedMode, setUploadedMode] = useState(false);
    const [favoriteMode, setFavoriteMode] = useState(false);

    return (
        <UserPageContainer>
            <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
                <VideoGalleryHeader userId={userId} profile={profile} uploadedMode={uploadedMode} favoriteMode={favoriteMode}/>
                <div className={classes.pageMain}>
                    {profile && checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessVideos) 
                        ?   <Routes>
                                <Route path='/' element={<Navigate to={`uploaded`}/>}/>
                                <Route path='/uploaded/' element={<VideoUploadedList setUploadedMode={setUploadedMode}/>}/>
                                <Route path='/favorite/' element={<VideoFavoriteList setFavoriteMode={setFavoriteMode}/>}/>
                            </Routes>
                        : <LockPage/>
                    }
                </div>
            </div>
        </UserPageContainer>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        profile: state.profile.profile,
    }
}

export default connect(mapStateToProps)(VideoGallery);