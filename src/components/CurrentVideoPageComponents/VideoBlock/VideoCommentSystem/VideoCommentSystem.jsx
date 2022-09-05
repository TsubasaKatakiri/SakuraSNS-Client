import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addCommentToVideo, dislikeCommentToVideo, getVideoComments, likeCommentToVideo, removeCommentToVideo, updateCommentToVideo } from '../../../../redux/CurrentVideo/CurrentVideoActions';
import CommentForm from '../../../MinorComponents/CommentForm/CommentForm';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import SimpleComment from '../../../MinorComponents/SimpleComment/SimpleComment';
import classes from './VideoCommentSystem.module.scss';

const VideoCommentSystem = ({currentUser, token, currentVideo, getVideoComments, comments, addCommentToVideo, removeCommentToVideo, ...props}) => {
    useEffect(()=>{
        getVideoComments(currentVideo._id, token);
    }, [currentVideo._id, token])

    const commentMethod = (comment) => {
        addCommentToVideo(comment, token);
    }

    const removeMethod = (commentId) => {
        removeCommentToVideo(commentId, currentUser._id, token);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.commentForm}>
                <CommentForm currentUser={currentUser} entryId={currentVideo._id} commentMethod={commentMethod}/>
            </div>
            <div className={classes.commentList}>
                {!comments || props.isFetching 
                ? <Preloader/>
                : comments.length === 0 
                    ? <span className={classes.message}>No comments</span>
                    : comments.map(c => {
                        return <SimpleComment key={c._id} currentUser={currentUser} comment={c} updateMethod={props.updateCommentToVideo} removeMethod={removeMethod} likeMethod={props.likeCommentToVideo} dislikeMethod={props.dislikeCommentToVideo} token={token}/>
                    })
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        currentVideo: state.currentVideo.currentVideo,
        comments: state.currentVideo.comments,
        isFetchingComments: state.currentVideo.isFetchingComments,
        errorComments: state.currentVideo.errorComments,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideoComments: (videoId, token) => {dispatch(getVideoComments(videoId, token))},
        addCommentToVideo: (comment, token) => {dispatch(addCommentToVideo(comment, token))},
        removeCommentToVideo: (commentId, userId, token) => {dispatch(removeCommentToVideo(commentId, userId, token))},
        updateCommentToVideo: (commentId, comment, token) => {dispatch(updateCommentToVideo(commentId, comment, token))},
        likeCommentToVideo: (commentId, userId, token) => {dispatch(likeCommentToVideo(commentId, userId, token))},
        dislikeCommentToVideo: (commentId, userId, token) => {dispatch(dislikeCommentToVideo(commentId, userId, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCommentSystem);