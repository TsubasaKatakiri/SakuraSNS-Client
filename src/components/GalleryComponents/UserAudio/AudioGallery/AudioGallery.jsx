import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './AudioGallery.module.scss';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import AudioUploadedList from '../AudioUploadedList/AudioUploadedList';
import AudioFavoriteList from '../AudioFavoriteList/AudioFavoriteList';
import { checkUserPrivacy } from '../../../../util/CheckUserPrivacy';
import LockPage from '../../../MinorComponents/LockPage/LockPage';
import AudioGalleryHeader from '../AudioGalleryHeader/AudioGalleryHeader';
import UserPageContainer from '../../../MinorComponents/UserPageContainer/UserPageContainer';

const AudioGallery = ({currentUser, profile}) => {
    const [uploadedMode, setUploadedMode] = useState(false);
    const [favoriteMode, setFavoriteMode] = useState(false);
    const userId = useParams().userId;

    return (
        <UserPageContainer>
            <div className={classes.wrapper}>
                <AudioGalleryHeader userId={userId} profile={profile} uploadedMode={uploadedMode} favoriteMode={favoriteMode}/>
                <div className={classes.pageMain}>
                    {profile && checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessMusic) 
                        ?   <Routes>
                                <Route path='/' element={<Navigate to={`uploaded`}/>}/>
                                <Route path='/uploaded/' element={<AudioUploadedList setUploadedMode={setUploadedMode}/>}/>
                                <Route path='/favorite/' element={<AudioFavoriteList setFavoriteMode={setFavoriteMode}/>}/>
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

export default connect(mapStateToProps)(AudioGallery);