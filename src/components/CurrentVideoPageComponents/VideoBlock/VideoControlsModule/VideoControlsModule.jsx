import { Delete, Edit, Favorite, FavoriteBorder } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'timeago-react';
import { likeVideo, updateVideo, dislikeVideo, setFavoriteVideo, unsetFavoriteVideo } from '../../../../redux/CurrentVideo/CurrentVideoActions';
import { removeVideofile } from '../../../../redux/Video/VideoActions';
import SimpleLikeDislikeControls from '../../../MinorComponents/SimpleLikeDislikeControls/SimpleLikeDislikeControls';
import classes from './VideoControlsModule.module.scss';
import { checkPolicy } from './../../../../util/CheckPolicy';
import VideoEditModal from '../VideoEditModal/VideoEditModal';
import DeletionModal from './../../../MinorComponents/DeletionModal/DeletionModal';
import { Link, useNavigate } from 'react-router-dom';
import { removeGroupVideofile } from '../../../../redux/GroupVideo/GroupVideoActions';

const VideoControlsModule = ({currentUser, token, currentVideo, group, removeVideofile, likeVideo, dislikeVideo, updateVideo, setFavoriteVideo, unsetFavoriteVideo, removeGroupVideofile}) => {
    const [favorite, setFavorite] = useState(currentVideo.favorite.includes(currentUser._id));
    const [openedEdit, setOpenedEdit] = useState(false);
    const [openedDelete, setOpenedDelete] = useState(false);
    const [openedGroupDelete, setOpenedGroupDelete] = useState(false);
    const navigate = useNavigate();
    const isDark = document.body.classList.contains('dark');

    const handleOpenEditModal = () => setOpenedEdit(!openedEdit);
    const handleOpenDeleteModal = () => setOpenedDelete(!openedDelete);
    const handleOpenGroupDeleteModal = () => setOpenedGroupDelete(!openedGroupDelete);

    const likeMethod = () => {
        likeVideo(currentVideo._id, currentUser._id, token);
    }

    const dislikeMethod = () => {
        dislikeVideo(currentVideo._id, currentUser._id, token);
    }

    const favoriteMethod = () => {
        setFavoriteVideo(currentVideo._id, currentUser._id, token);
        setFavorite(true);
    }

    const unfavoriteMethod = () => {
        unsetFavoriteVideo(currentVideo._id, currentUser._id, token);
        setFavorite(false);
    }

    const editVideofile = (videoData) => {
        updateVideo(currentVideo._id, videoData, token);
    } 
    
    const deleteVideofile = () => {
        removeVideofile(currentVideo._id, currentUser._id, token);
        if(group) navigate('../');
        else navigate('../video');
    } 

    const deleteVideofileFromGroup = () => {
        removeGroupVideofile(currentVideo._id, {groupId: group._id, userId: currentUser._id, videoId: currentVideo._id}, token);
        navigate('../');
    } 

    if(openedEdit || openedDelete || openedGroupDelete) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.tagLine}>
                {currentVideo.tags.map((tag, i) => (<Link to={`/video/search?tag=${tag.substr(1)}`} className={classes.tag} key={i}>{tag}</Link>))}
            </div>
            <h3 className={classes.videoName}>{currentVideo.name}</h3>
            <div className={classes.statControlsBar}>
                <div className={classes.videoStats}>
                    <span className={classes.videoStat}>{currentVideo.views} views</span>
                    <span className={classes.videoStat}>
                        Uploaded <TimeAgo datetime={currentVideo.createdAt} locale='en_US' live={true}/>
                    </span>
                </div>
                <div className={classes.videoControls}>
                    <SimpleLikeDislikeControls currentUser={currentUser} likes={currentVideo.likes} dislikes={currentVideo.dislikes} likeMethod={likeMethod} dislikeMethod={dislikeMethod}/>
                    {favorite 
                        ? <div className={classes.controlFavorite} onClick={unfavoriteMethod}>
                            <Favorite className={classes.icon}/>
                            <span className={classes.iconCaption}>{currentVideo.favorite.length}</span>
                        </div>
                        : <div className={classes.controlFavorite} onClick={favoriteMethod}>
                            <FavoriteBorder className={classes.icon}/>
                            <span className={classes.iconCaption}>{currentVideo.favorite.length}</span>
                        </div>
                    }
                    {currentUser._id === currentVideo.uploader._id
                    ?   <>
                            <div className={classes.control} onClick={handleOpenEditModal}>
                                <Edit className={classes.icon}/>
                                <span className={classes.iconCaption}>Edit</span>
                            </div>
                            <div className={classes.control} onClick={handleOpenDeleteModal}>
                                <Delete className={classes.icon}/>
                                <span className={classes.iconCaption}>Delete</span>
                            </div>
                        </>
                    :   ''
                    }
                    {group
                    ? <>{(currentUser._id === currentVideo.uploader._id || checkPolicy(group, currentUser._id, group.policies.canEditGroupInfo)) && group.videos.filter(v=>v._id===(currentVideo._id)).length > 0
                        ?   <div className={classes.control} onClick={handleOpenGroupDeleteModal}>
                                <Delete className={classes.icon}/>
                                <span className={classes.iconCaption}>G.Delete</span>
                            </div>
                        : ''
                    }</>
                    : ''
                    }    
                </div>
            </div>
            <VideoEditModal currentUser={currentUser} group={group} video={currentVideo} opened={openedEdit} setOpened={setOpenedEdit} updateMethod={editVideofile}/>
            <DeletionModal caption={'Do you want to delete this video?'} opened={openedDelete} setOpened={setOpenedDelete} deleteMethod={deleteVideofile}/>
            <DeletionModal caption={'Do you want to delete this video from group?'} opened={openedGroupDelete} setOpened={setOpenedGroupDelete} deleteMethod={deleteVideofileFromGroup}/>
        </div>   
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        currentVideo: state.currentVideo.currentVideo,
        group: state.group.group,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeVideofile: (videoId, userId, token) => {dispatch(removeVideofile(videoId, userId, token))},
        likeVideo: (videoId, userId, token) => {dispatch(likeVideo(videoId, userId, token))},
        dislikeVideo: (videoId, userId, token) => {dispatch(dislikeVideo(videoId, userId, token))},
        updateVideo: (videoId, videofile, token) => {dispatch(updateVideo(videoId, videofile, token))},
        setFavoriteVideo: (videoId, userId, token) => {dispatch(setFavoriteVideo(videoId, userId, token))},
        unsetFavoriteVideo: (videoId, userId, token) => {dispatch(unsetFavoriteVideo(videoId, userId, token))},
        removeGroupVideofile: (videoId, groupData, token) => {dispatch(removeGroupVideofile(videoId, groupData, token))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VideoControlsModule);