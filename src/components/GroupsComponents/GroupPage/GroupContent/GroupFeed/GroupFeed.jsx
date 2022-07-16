import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addPostToGroupFeed, dislikeGroupPost, getGroupFeed, likeGroupPost, removePostFromGroupFeed, resetGroupFeed, setGroupFeedPage, syncronizeGroupPostDelete, syncronizeGroupPostDislike, syncronizeGroupPostLike, syncronizeGroupPostUpdate } from '../../../../../redux/GroupFeed/GroupFeedActions';
import FeedComponent from '../../../../Feed/FeedComponent/FeedComponent';
import classes from './GroupFeed.module.scss';

const GroupFeed = ({currentUser, token, group, posts, isFetching, error, getGroupFeed, resetGroupFeed, page, more, addPostToGroupFeed, ...props}) => {
    const postId = useParams().postId;
    const [modalPostOpened, setModalPostOpened] = useState(false);

    useEffect(()=>{
        if(postId) {
            setModalPostOpened(true);
        } else {
            setModalPostOpened(false);
        }
    }, [postId]);

    if(modalPostOpened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);


    useEffect(() => {
        if(posts.length !== 0) resetGroupFeed();
        getGroupFeed (group._id, token);
        return () => resetGroupFeed();
    }, [group._id]);

    const isBottom = (element) => {
        return element.getBoundingClientRect().bottom < window.innerHeight;
    }

    const trackScrolling = useCallback(() => {
        const element = document.getElementById('feed');
        if(isBottom(element) && !isFetching && more){
            getGroupFeed (group._id, token, ++page);
        }
    }, [getGroupFeed, isFetching, page, more, token]);

    useEffect(() => {
        if(more) document.addEventListener('scroll', trackScrolling);
        return () => {document.removeEventListener('scroll', trackScrolling)};
    }, [more, trackScrolling]);

    const createMethod = (postData) => {
        console.log(postData);
        addPostToGroupFeed(postData, token);
    }

    
    return <FeedComponent currentUser={currentUser} token={token} group={group} posts={posts} isFetching={isFetching} error={error} createMethod={createMethod} likeGroupPost={props.likeFeedPost} dislikeGroupPost={props.dislikeFeedPost} modalPostOpened={modalPostOpened} setModalPostOpened={setModalPostOpened} syncronizeUpdate={props.syncronizeUpdate} syncronizeDelete={props.syncronizeDelete} syncronizeLike={props.syncronizeLike} syncronizeDislike={props.syncronizeDislike}/>;
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        posts: state.groupFeed.feedPosts,
        limit: state.groupFeed.feedLimit,
        page: state.groupFeed.feedPage,
        totalPosts: state.groupFeed.totalPosts,
        totalPages: state.groupFeed.totalFeedPages,
        more: state.groupFeed.moreFeed,
        isFetching: state.groupFeed.isFetching,
        error: state.groupFeed.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroupFeed: (groupId, token, limit, page) => {dispatch(getGroupFeed(groupId, token, limit, page))},
        addPostToGroupFeed: (post, token) => {dispatch(addPostToGroupFeed(post, token))},
        removePostFromGroupFeed: (postId, userId, token) => {dispatch(removePostFromGroupFeed(postId, userId, token))},
        resetGroupFeed: () => {dispatch(resetGroupFeed())},
        setGroupFeedPage: (page) => {dispatch(setGroupFeedPage(page))},
        likeGroupPost: (postId, userId, token) => {dispatch(likeGroupPost(postId, userId, token))},
        dislikeGroupPost: (postId, userId, token) => {dispatch(dislikeGroupPost(postId, userId, token))},
        syncronizeUpdate: (postId, post) => {dispatch(syncronizeGroupPostUpdate(postId, post))},
        syncronizeDelete: (postId) => {dispatch(syncronizeGroupPostDelete(postId))},
        syncronizeLike: (postId, userId) => {dispatch(syncronizeGroupPostLike(postId, userId))},
        syncronizeDislike: (postId, userId) => {dispatch(syncronizeGroupPostDislike(postId, userId))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupFeed);