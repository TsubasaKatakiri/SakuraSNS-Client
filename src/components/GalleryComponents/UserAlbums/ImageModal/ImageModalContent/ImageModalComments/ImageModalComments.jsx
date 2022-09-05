import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addGroupImageComment, deleteGroupImageComment, dislikeGroupImageComment, getGroupImageComments, likeGroupImageComment, updateGroupImageComment } from '../../../../../../redux/GroupImage/GroupImageActions';
import CommentForm from '../../../../../MinorComponents/CommentForm/CommentForm';
import Preloader from '../../../../../MinorComponents/Preloader/Preloader';
import SimpleComment from '../../../../../MinorComponents/SimpleComment/SimpleComment';
import classes from './ImageModalComments.module.scss';

const ImageModalComments = ({currentUser, token, imageId, image, comments, getComments, addComment, deleteComment, ...props}) => {
    useEffect(() => {
        getComments(imageId, token)
    }, []);
    
    const commentMethod = (comment) => {
        addComment(comment, token);
    }

    const removeMethod = (commentId) => {
        deleteComment(commentId, currentUser._id, token);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.commentForm}>
                <CommentForm currentUser={currentUser} entryId={imageId} commentMethod={commentMethod}/>
            </div>
            <div className={classes.commentList}>
                {!comments || props.isFetching 
                ? <Preloader/>
                : comments.length === 0 
                    ? <span className={classes.message}>No comments</span>
                    : <>{comments.map(c => {
                            return <SimpleComment key={c._id} currentUser={currentUser} comment={c} updateMethod={props.updateComment} removeMethod={removeMethod} likeMethod={props.likeComment} dislikeMethod={props.dislikeComment} token={token}/>
                        })}
                    </>
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        image: state.groupImage.image,
        comments: state.groupImage.comments,
        isFetching: state.groupImage.isFetchingComments,
        error: state.groupImage.errorComments,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: (entryId, token) => {dispatch(getGroupImageComments(entryId, token))},
        addComment: (comment, token) => {dispatch(addGroupImageComment(comment, token))},
        updateComment: (commentId, comment, token) => {dispatch(updateGroupImageComment(commentId, comment, token))},
        deleteComment: (commentId, userId, token) => {dispatch(deleteGroupImageComment(commentId, userId, token))},
        likeComment: (commentId, userId, token) => {dispatch(likeGroupImageComment(commentId, userId, token))},
        dislikeComment: (commentId, userId, token) => {dispatch(dislikeGroupImageComment(commentId, userId, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageModalComments);