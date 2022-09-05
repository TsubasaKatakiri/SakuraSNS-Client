import React from 'react';
import classes from './UserAlbums.module.scss';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import UserAlbumsListContainer from './UserAlbumsList/UserAlbumsListContainer';
import UserAlbumContainer from './UserAlbum/UserAlbumContainer';
import LockPage from '../../MinorComponents/LockPage/LockPage';
import { checkUserPrivacy } from '../../../util/CheckUserPrivacy';
import UserPageContainer from '../../MinorComponents/UserPageContainer/UserPageContainer';

const UserAlbums = ({currentUser, profile}) => {
    return (
        <UserPageContainer>
            <div className={classes.wrapper}>
                {profile && checkUserPrivacy(currentUser._id, profile, profile.userSettings.canAccessAlbums) 
                    ?   <Routes>
                            <Route path='/' element={<UserAlbumsListContainer/>}/>
                            <Route path='/:albumId' element={<UserAlbumContainer/>}/>
                            <Route path='/:albumId/:imageId' element={<UserAlbumContainer/>}/>
                        </Routes>
                    : <LockPage/>
                }
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

export default connect(mapStateToProps)(UserAlbums);