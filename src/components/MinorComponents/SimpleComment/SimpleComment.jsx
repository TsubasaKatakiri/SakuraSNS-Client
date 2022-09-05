import React, { useState } from 'react';
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import TimeAgo from "timeago-react";
import classes from './SimpleComment.module.css';
import { Delete, Edit } from '@material-ui/icons';
import SimpleLikeDislikeControls from '../SimpleLikeDislikeControls/SimpleLikeDislikeControls';
import CommentEditForm from './CommentEditForm/CommentEditForm';

const SimpleComment = ({currentUser, comment, updateMethod, removeMethod, likeMethod, dislikeMethod, token}) => {
    const [editMode, setEditMode] = useState(false);

    const handleEnablingEdit = () => setEditMode(!editMode);

    const likeComment = () => {
        likeMethod(comment._id, currentUser._id, token);
    }

    const dislikeComment = () => {
        dislikeMethod(comment._id, currentUser._id, token);
    }

    const updateComment = (commentData) => {
        console.log(commentData);
        updateMethod(comment._id, commentData, token);
        handleEnablingEdit();
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.commentHeader}>
                <div className={classes.commentInfo}>
                    <AuthorInfo user={comment.user}/>
                    <TimeAgo datetime={comment.createdAt} locale="en_US" live={true} className={classes.commentTime}/>
                </div>
                <div className={classes.controls}>
                    {comment.user._id === currentUser._id
                        ?   <>
                                <div className={classes.control} onClick={handleEnablingEdit}>
                                    <Edit className={classes.icon}/>
                                </div>
                                <div className={classes.control} onClick={()=>removeMethod(comment._id)}>
                                    <Delete className={classes.icon}/>
                                </div>
                            </>
                        :   ''
                    }
                </div>
            </div>
            {!editMode 
            ? <>
                <div className={classes.commentMain}>
                    <p className={classes.commentText}>{comment.text}</p>
                </div>
                <div className={classes.commentFooter}>
                    <SimpleLikeDislikeControls currentUser={currentUser} likes={comment.likes} dislikes={comment.dislikes} likeMethod={likeComment} dislikeMethod={dislikeComment}/>
                </div>
            </>
            : <CommentEditForm currentUser={currentUser} comment={comment} editMethod={updateComment}/>
            }
            
        </div>
    );
};

export default SimpleComment;