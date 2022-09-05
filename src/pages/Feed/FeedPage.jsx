import React from 'react';
import { connect } from 'react-redux';
import Preloader from '../../components/MinorComponents/Preloader/Preloader';
import FeedMain from '../../components/FeedPageComponents/FeedMain';
import { Route, Routes } from 'react-router-dom';

const FeedPage = (props) => {
    if(!props.currentUser) return <Preloader/>

    return (
        <Routes>
            <Route path="/" element={<FeedMain currentUser={props.currentUser}/>}/>
            <Route path="/post" element={<FeedMain currentUser={props.currentUser}/>}/>
            <Route path="/post/:postId" element={<FeedMain currentUser={props.currentUser}/>}/>
        </Routes>
    )
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps)(FeedPage);