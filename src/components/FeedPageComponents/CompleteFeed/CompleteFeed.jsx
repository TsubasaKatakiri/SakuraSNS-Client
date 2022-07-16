import React, {  useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addPostToFeed, dislikeFeedPost, getFeed, getTagFeed, likeFeedPost, removePostFromFeed, resetFeed, setFeedPage } from '../../../redux/Feed/FeedActions';
import classes from './CompleteFeed.module.scss';
import { syncronizeFeedPostUpdate, syncronizeFeedPostDelete, syncronizeFeedPostDislike, syncronizeFeedPostLike } from './../../../redux/Feed/FeedActions';
import FeedComponent from '../../Feed/FeedComponent/FeedComponent';

const CompleteFeed = ({currentUser, token, group, posts, isFetching, error, getFeed, getTagFeed, resetFeed, page, more, addPostToFeed, ...props}) => {
    const postId = useParams().postId;
    const [modalPostOpened, setModalPostOpened] = useState(false);

    const getResults = (pageNumber) => {
        if(pageNumber) getFeed(currentUser._id, token, pageNumber);
        else getFeed(currentUser._id, token);
    }

    useEffect(() => {
        getResults();
        return () => resetFeed();
    }, [])

    useEffect(()=>{
        if(postId) {
            setModalPostOpened(true);
        } else {
            setModalPostOpened(false);
        }
    }, [postId]);

    if(modalPostOpened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    const createMethod = (postData) => {
        console.log(postData);
        addPostToFeed(postData, token);
    }

    return <FeedComponent currentUser={currentUser} token={token} posts={posts} getResults={getResults} page={page} more={more} profile={currentUser} isFetching={isFetching} error={error} createMethod={createMethod} likeGroupPost={props.likeFeedPost} dislikeGroupPost={props.dislikeFeedPost} modalPostOpened={modalPostOpened} setModalPostOpened={setModalPostOpened} syncronizeUpdate={props.syncronizeUpdate} syncronizeDelete={props.syncronizeDelete} syncronizeLike={props.syncronizeLike} syncronizeDislike={props.syncronizeDislike}/>;
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        posts: state.feed.feedPosts,
        limit: state.feed.feedLimit,
        page: state.feed.feedPage,
        totalPages: state.feed.totalFeedPages,
        more: state.feed.moreFeed,
        isFetching: state.feed.isFetching,
        error: state.feed.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFeed: (id, token, page, limit) => {dispatch(getFeed(id, token, page, limit))},
        getTagFeed: (tag, token, page, limit) => {dispatch(getTagFeed(tag, token, page, limit))},
        addPostToFeed: (post, token) => {dispatch(addPostToFeed(post, token))},
        removePostFromFeed: (postId, userId, token) => {dispatch(removePostFromFeed(postId, userId, token))},
        resetFeed: () => {dispatch(resetFeed())},
        setFeedPage: (page) => {dispatch(setFeedPage(page))},
        likeFeedPost: (postId, userId, token) => {dispatch(likeFeedPost(postId, userId, token))},
        dislikeFeedPost: (postId, userId, token) => {dispatch(dislikeFeedPost(postId, userId, token))},
        syncronizeUpdate: (postId, post) => {dispatch(syncronizeFeedPostUpdate(postId, post))},
        syncronizeDelete: (postId) => {dispatch(syncronizeFeedPostDelete(postId))},
        syncronizeLike: (postId, userId) => {dispatch(syncronizeFeedPostLike(postId, userId))},
        syncronizeDislike: (postId, userId) => {dispatch(syncronizeFeedPostDislike(postId, userId))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CompleteFeed);