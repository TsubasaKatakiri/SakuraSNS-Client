import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import AuthorInfo from '../../../../MinorComponents/AuthorInfo/AuthorInfo';
import DeletionModal from '../../../../MinorComponents/DeletionModal/DeletionModal';
import ImageEditModal from './ImageEditModal/ImageEditModal';
import ImageModalComments from './ImageModalComments/ImageModalComments';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import classes from './ImageModalContent.module.scss';
import { checkPolicy } from './../../../../../util/CheckPolicy';

const ImageModalContent = ({image, currentUser, profile, group, album, handleOpenDeleteModal, handleOpenEditModal, changeProfile, changeCover, ...props}) => {
    const isDark = document.body.classList.contains('dark');
    const isAllowed = group ? checkPolicy(group, currentUser._id, group.policies.canEditGroupInfo) : currentUser._id === profile._id;
    const isLocked = album.albumSettings.isGroupLocked;

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.infoSection}>
                <div className={classes.info}>
                    <AuthorInfo user={image.uploader}/>
                    {image.name ? <p className={classes.name}>{image.name}</p> : ''}
                    <p className={classes.posted}>Posted at: {new Date(image.createdAt).toLocaleString()}</p>
                </div>
                <div className={classes.controls}>
                    {(currentUser._id === image.uploader._id || isAllowed) && !isLocked
                    ? <>
                        <div className={classes.control} onClick={handleOpenEditModal}>
                            <Edit className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>Edit</span>
                        </div>
                        <div className={classes.control} onClick={handleOpenDeleteModal}>
                            <Delete className={classes.controlIcon}/>
                            <span className={classes.controlCaption}>Delete</span>
                        </div>
                    </> 
                    : ''}  
                    {isAllowed 
                    ? <>
                        <div className={classes.control} onClick={changeProfile}>
                            <span className={classes.controlCaption}>Profile</span>
                        </div>
                        <div className={classes.control} onClick={changeCover}>
                            <span className={classes.controlCaption}>Cover</span>
                        </div>
                    </> 
                    : ''} 
                    <a href={`${image.imagefile}`} target='_blank' rel='noopener noreferrer' className={classes.control}>
                        <FullscreenIcon className={classes.controlIcon}/>
                    </a>
                </div>
            </div>
            <div className={classes.commentBlock}>
                <ImageModalComments imageId={image._id}/>
            </div>
            <ImageEditModal currentUser={currentUser} group={group} profile={profile} image={image} album={album} opened={props.openedEdit} setOpened={props.setOpenedEdit} updateMethod={props.editImage}/>
            <DeletionModal caption='Do you want to delete this image?' opened={props.openedDelete} setOpened={props.setOpenedDelete} deleteMethod={props.deleteImage}/>
        </div>
    );
};

export default ImageModalContent;