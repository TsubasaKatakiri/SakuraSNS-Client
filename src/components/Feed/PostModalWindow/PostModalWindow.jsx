import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteFeedPost, dislikeCurrentPost, editFeedPost, getFeedPost, likeCurrentPost, resetPost } from '../../../redux/CurrentFeedPost/CurrentFeedPostActions';
import PostModalShell from '../../MinorComponents/PostModalShell/PostModalShell';
import Preloader from '../../MinorComponents/Preloader/Preloader';
import PostCommentSystem from './PostCommentSystem/PostCommentSystem';
import PostModalContent from './PostModalContent/PostModalContent';
import classes from './PostModalWindow.module.scss';

const PostModalWindow = ({opened, setOpened, currentUser, token, group, post, comments, getFeedPost, resetPost, getFeedPostComments, likeCurrentPost, dislikeCurrentPost, ...props}) => {
    const postId = useParams().postId;
    const navigate = useNavigate();

    const handleCancel = () => {
        resetPost();
        setOpened(!opened);
        if(group) navigate(`../${group._id}`);
        else navigate(`../`);
    }

    useEffect(()=>{
        if(opened) getFeedPost(postId, token);
        return () => {
            resetPost();
        }
    }, [opened, postId]);

    const likeMethod = () => {
        likeCurrentPost(post._id, currentUser._id, token);
        props.syncronizeLike(postId, currentUser._id);
    }

    const dislikeMethod = () => {
        dislikeCurrentPost(post._id, currentUser._id, token);
        props.syncronizeDislike(postId, currentUser._id);
    }

    if(!opened) return <></>;


    return(
        <PostModalShell handleCancel={handleCancel}>
            {!post || props.isFetching 
            ?   <Preloader/>
            :   <>
                    <div className={classes.postSection}>
                        <PostModalContent currentUser={currentUser} token={token} group={group} post={post} likeMethod={likeMethod} dislikeMethod={dislikeMethod} editPostMethod={props.editFeedPost} synchronizePost={props.syncronizePost} syncronizeDelete={props.syncronizeDelete} deletePost={props.deleteFeedPost}/>
                    </div>
                    <div className={classes.commentSection}>
                        <PostCommentSystem postId={postId}/>
                    </div>
                </>
            }
        </PostModalShell>
    )
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        post: state.post.post,
        isFetching: state.post.isFetching,
        error: state.post.error,
        comments: state.post.comments,
        isFetchingComments: state.post.isFetchingComments,
        errorComments: state.post.errorComments,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFeedPost: (postId, token) => {dispatch(getFeedPost(postId, token))},
        resetPost: () => {dispatch(resetPost())},
        editFeedPost: (postId, post, token) => {dispatch(editFeedPost(postId, post, token))},
        deleteFeedPost: (postId, userId, token) => {dispatch(deleteFeedPost(postId, userId, token))},
        likeCurrentPost: (postId, userId, token) => {dispatch(likeCurrentPost(postId, userId, token))},
        dislikeCurrentPost: (postId, userId, token) => {dispatch(dislikeCurrentPost(postId, userId, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModalWindow);