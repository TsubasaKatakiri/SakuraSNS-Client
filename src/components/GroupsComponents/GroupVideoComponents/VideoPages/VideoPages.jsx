import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VideoGallery from './../VideoGallery/VideoGallery';
import CurrentVideoPageContainer from './../../../CurrentVideoPageComponents/CurrentVideoPageContainer';

const VideoPages = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<VideoGallery/>}/>
                <Route path="/:videoId" element={<CurrentVideoPageContainer/>}/>
            </Routes>
        </>
    );
};

export default VideoPages;