import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GroupAlbumsListContainer from './../GroupAlbumsList/GroupAlbumsListContainer';
import GroupAlbumContainer from './../GroupAlbum/GroupAlbumContainer';

const AlbumsPage = () => {
    return (
        <Routes>
            <Route path="/" element={<GroupAlbumsListContainer/>}/>
            <Route path="/:albumId" element={<GroupAlbumContainer/>}/>
            <Route path="/:albumId/:imageId" element={<GroupAlbumContainer/>}/>
        </Routes>
    );
};

export default AlbumsPage;