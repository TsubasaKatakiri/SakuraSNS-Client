import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addFeedPostComment, deleteFeedPostComment, dislikeFeedPostComment, getFeedPostComments, likeFeedPostComment, updateFeedPostComment } from '../../../../redux/CurrentFeedPost/CurrentFeedPostActions';
import CommentForm from '../../../MinorComponents/CommentForm/CommentForm';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import SimpleComment from '../../../MinorComponents/SimpleComment/SimpleComment';
import classes from './PostCommentSystem.module.scss';

const PostCommentSystem = ({postId, currentUser, token, group, post, comments, getFeedPostComments, addFeedPostComment, deleteFeedPostComment, ...props}) => {
    useEffect(()=>{
        getFeedPostComments(postId, token);
    }, [getFeedPostComments, postId, token]);

    const commentMethod = (comment) => {
        addFeedPostComment(comment, token);
    }

    const removeMethod = (commentId) => {
        deleteFeedPostComment(commentId, currentUser._id, token);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.commentForm}>
                <CommentForm currentUser={currentUser} entryId={postId} commentMethod={commentMethod}/>
            </div>
            <div className={classes.commentList}>
                {!comments || props.isFetchingComments 
                ? <Preloader/>
                : comments.length === 0 
                    ? <span className={classes.message}>No comments</span>
                    : comments.map(c => {
                        return <SimpleComment key={c._id} currentUser={currentUser} comment={c} updateMethod={props.updateFeedPostComment} removeMethod={removeMethod} likeMethod={props.likeFeedPostComment} dislikeMethod={props.dislikeFeedPostComment} token={token}/>
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
        group: state.group.group,
        post: state.post.post,
        comments: state.post.comments,
        isFetchingComments: state.post.isFetchingComments,
        errorComments: state.post.errorComments,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFeedPostComments: (entryId, token) => {dispatch(getFeedPostComments(entryId, token))},
        addFeedPostComment: (comment, token) => {dispatch(addFeedPostComment(comment, token))},
        updateFeedPostComment: (commentId, comment, token) => {dispatch(updateFeedPostComment(commentId, comment, token))},
        deleteFeedPostComment: (commentId, userId, token) => {dispatch(deleteFeedPostComment(commentId, userId, token))},
        likeFeedPostComment: (commentId, userId, token) => {dispatch(likeFeedPostComment(commentId, userId, token))},
        dislikeFeedPostComment: (commentId, userId, token) => {dispatch(dislikeFeedPostComment(commentId, userId, token))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostCommentSystem);