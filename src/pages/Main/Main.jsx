import React from 'react';
import classes from './Main.module.scss';
import Navbar from './../../components/Navbar/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import LeftSidebar from './../../components/LeftSidebar/LeftSidebar';
import Profile from './../Profile/Profile';
import Chat from './../Chat/Chat';
import { logout } from './../../redux/Auth/AuthActions';
import FeedPage from '../Feed/FeedPage';
import MusicPage from './../Music/MusicPage';
import VideoPage from './../Video/VideoPage';
import GroupsPage from './../Groups/GroupsPage';
import SettingsPage from './../Settings/SettingsPage';
import Preloader from '../../components/MinorComponents/Preloader/Preloader';
import VideoCurrentPage from '../VideoCurrent/VideoCurrentPage';
import PeoplePage from '../People/PeoplePage';
import VideoSearch from '../VideoSearch/VideoSearch';
import AudioGallery from '../../components/GalleryComponents/UserAudio/AudioGallery/AudioGallery';
import VideoGallery from '../../components/GalleryComponents/UserVideo/VideoGallery/VideoGallery';
import UserAlbums from './../../components/GalleryComponents/UserAlbums/UserAlbums';

const Main = ({currentUser, token, isAuthenticated, logout}) => {
    if(!currentUser) return <Preloader/>;

    return (
        <div className={`${classes.wrapper} ${currentUser.userSettings.isDarkMode ? classes.night : ''}`}>
            <Navbar/>
            <div className={classes.page}>
                <div className={classes.pageContainer}>
                    <LeftSidebar/>
                    <div className={classes.pageContent}>
                        <Routes>
                            <Route path="/" element={<Navigate to={`/profile/${currentUser._id}`}/>}/>
                            <Route path="/profile/" element={<Navigate to={`/profile/${currentUser._id}`}/>}/>
                            <Route path="/profile/:userId/*" element={<Profile/>}/>
                            <Route path="/profile/:userId/music/*" element={<AudioGallery/>}/>
                            <Route path="/profile/:userId/videos/*" element={<VideoGallery/>}/>
                            <Route path="/profile/:userId/albums/*" element={<UserAlbums/>}/>
                            <Route path="/feed/*" element={<FeedPage/>}/>
                            <Route path="/chat/*" element={<Chat/>}/>
                            <Route path="/music" element={<MusicPage/>}/>
                            <Route path="/video/" element={<VideoPage/>}/>
                            <Route path="/video/search" element={<VideoSearch/>}/>
                            <Route path="/video/:videoId" element={<VideoCurrentPage/>}/>
                            <Route path="/groups/*" element={<GroupsPage/>}/>
                            <Route path="/people/*" element={<PeoplePage/>}/>
                            <Route path="/settings" element={<SettingsPage/>}/>
                            <Route path="/*" element={<Navigate to={`/profile/${currentUser._id}`}/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {dispatch(logout())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);