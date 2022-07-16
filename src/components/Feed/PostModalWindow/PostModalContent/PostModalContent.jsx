import React, { useEffect, useState } from 'react';
import TimeAgo from 'timeago-react';
import PostBody from '../../Post/PostBody/PostBody';
import PostEditForm from '../../Post/PostEditForm/PostEditForm';
import AuthorInfo from '../../../MinorComponents/AuthorInfo/AuthorInfo';
import SimpleLikeDislikeControls from '../../../MinorComponents/SimpleLikeDislikeControls/SimpleLikeDislikeControls';
import classes from './PostModalContent.module.scss';
import { Delete, Edit } from '@material-ui/icons';
import { checkPolicy } from '../../../../util/CheckPolicy';
import DeletionModal from '../../../MinorComponents/DeletionModal/DeletionModal';
import { useNavigate } from 'react-router-dom';

const PostModalContent = ({currentUser, token, group, post, likeMethod, dislikeMethod, editPostMethod, deletePost, synchronizePost, syncronizeDelete}) => {
    const [editMode, setEditMode] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const navigate = useNavigate();
    const isDark = document.body.classList.contains('dark');

    const handleEnablingEdit = () => setEditMode(!editMode);
    const handleOpenDeleteModal = () => setOpenDelete(!openDelete);

    const sliderContent = post.attachments.filter(element => element.type !== 'audio' || element.type !== 'other');
    const audioContent = post.attachments.filter(element => element.type === 'audio');

    useEffect(() => {
        synchronizePost(post._id, post);
    }, [post]);


    const updateComment = (postData) => {
        editPostMethod(post._id, postData, token);
        handleEnablingEdit();
    }

    const deleteMethod = () => {
        syncronizeDelete(post._id);
        deletePost(post._id, currentUser._id, token);
        if(group) navigate(`../${group._id}`);
        else navigate(`../`);
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.post}>
                <div className={classes.header}>
                    <div className={classes.headerInfo}>
                        <AuthorInfo user={post.user}/>
                        <TimeAgo datetime={post.createdAt} locale='en_US' live={true} className={classes.headerTime}/>
                    </div>
                    <div className={classes.headerControls}>
                        {post.user._id === currentUser._id || (group && checkPolicy(group, currentUser._id, group.policies.canDeletePosts))
                            ?   <>
                                    <div className={classes.control} onClick={handleEnablingEdit}>
                                        <Edit className={classes.controlIcon}/>
                                    </div>
                                    <div className={classes.control} onClick={handleOpenDeleteModal}>
                                        <Delete className={classes.controlIcon}/>
                                    </div>
                                </>
                            :   ''
                        }
                    </div>
                </div>
                {!editMode 
                    ? <PostBody post={post} sliderContent={sliderContent} audioContent={audioContent}/>
                    : <PostEditForm post={post} handleEditMode={handleEnablingEdit} currentUser={currentUser} token={token} editMethod={updateComment} />
                }
                <div className={classes.footer}>
                    {post.tags.length > 0 ? <div className={classes.tagLine}>
                        {post.tags.map((tag, i)=>{
                            return <span className={classes.tag} key={i}>{tag}</span>
                        })}
                    </div> : ""}
                    <SimpleLikeDislikeControls currentUser={currentUser} likes={post.likes} dislikes={post.dislikes} likeMethod={likeMethod} dislikeMethod={dislikeMethod}/>
                </div>
            </div>
            <h3 className={classes.commentInfo}>{post.comments.length} comments</h3>
            <DeletionModal caption='Do you want to delete this post?' opened={openDelete} setOpened={setOpenDelete} deleteMethod={deleteMethod}/>
        </div>
    );
};

export default PostModalContent;