import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createPost, dislikePost, getPosts, likePost, resetUserPosts, setPostsPage, removePost, syncronizePostDelete, syncronizePostDislike, syncronizePostLike, syncronizePostUpdate } from '../../../redux/Post/PostActions';
import FeedComponent from '../FeedComponent/FeedComponent';
import classes from './ProfileFeed.module.scss';

const ProfileFeed = ({currentUser, profile, token, group, posts, isFetching, error, getPosts, resetUserPosts, page, more, createPost, ...props}) => {
    const postId = useParams().postId;
    const [modalPostOpened, setModalPostOpened] = useState(false);

    const getResults = (pageNumber) => {
        if(pageNumber) getPosts(profile._id, token, pageNumber);
        else getPosts(profile._id, token);
    }

    useEffect(() => {
        getResults();
        return () => resetUserPosts();
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
        createPost(postData, token);
    }

    return <FeedComponent currentUser={currentUser} token={token} getResults={getResults} posts={posts} page={page} more={more} profile={profile} isFetching={isFetching} error={error} createMethod={createMethod} likeGroupPost={props.likeFeedPost} dislikeGroupPost={props.dislikeFeedPost} modalPostOpened={modalPostOpened} setModalPostOpened={setModalPostOpened} syncronizeUpdate={props.syncronizeUpdate} syncronizeDelete={props.syncronizeDelete} syncronizeLike={props.syncronizeLike} syncronizeDislike={props.syncronizeDislike}/>;
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        posts: state.posts.posts,
        limit: state.posts.postsLimit,
        page: state.posts.postsPage,
        totalPages: state.posts.totalPostPages,
        more: state.posts.morePosts,
        isFetching: state.posts.isFetching,
        error: state.posts.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (userId, token, page, limit) => {dispatch(getPosts(userId, token, page, limit))},
        createPost: (post, token) => {dispatch(createPost(post, token))},
        removePost: (postId, userId, token) => {dispatch(removePost(postId, userId, token))},
        resetUserPosts: () => {dispatch(resetUserPosts())},
        setPostsPage: (page) => {dispatch(setPostsPage(page))},
        likePost: (postId, userId, token) => {dispatch(likePost(postId, userId, token))},
        dislikePost: (postId, userId, token) => {dispatch(dislikePost(postId, userId, token))},
        syncronizeUpdate: (postId, post) => {dispatch(syncronizePostUpdate(postId, post))},
        syncronizeDelete: (postId) => {dispatch(syncronizePostDelete(postId))},
        syncronizeLike: (postId, userId) => {dispatch(syncronizePostLike(postId, userId))},
        syncronizeDislike: (postId, userId) => {dispatch(syncronizePostDislike(postId, userId))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileFeed);