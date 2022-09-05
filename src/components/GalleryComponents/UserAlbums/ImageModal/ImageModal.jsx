import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GroupAPI } from '../../../../api/GroupApi';
import { UserAPI } from '../../../../api/UserApi';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import SimpleModalShell from '../../../MinorComponents/SimpleModalShell/SimpleModalShell';
import ImageModalContent from './ImageModalContent/ImageModalContent';
import classes from './ImageModal.module.scss';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { deleteGroupImage, editGroupImage, getGroupImage, resetImage } from '../../../../redux/GroupImage/GroupImageActions';
import { deleteGroupAlbumPhoto } from './../../../../redux/GroupAlbum/GroupAlbumActions';
import { deleteUserAlbumPhoto } from './../../../../redux/AlbumGallery/AlbumGalleryActions';

const ImageModal = ({opened, setOpened, currentUser, group, profile, album, token, image, getImage, resetImage, deleteImage, editImage, deleteGroupAlbumPhoto, deleteUserAlbumPhoto, ...props}) => {
    const imageId = useParams().imageId;
    const [openedDelete, setOpenedDelete] = useState(false);
    const [openedEdit, setOpenedEdit] = useState(false);
    const navigate = useNavigate();

    const imagesList = album.images.map(i => i = i._id);
    const currentPosition = imagesList.indexOf(imageId);
    const previousImage = currentPosition > 0 ? imagesList[currentPosition - 1] : imagesList[imagesList.length - 1];
    const nextImage = currentPosition < imagesList.length - 1 ? imagesList[currentPosition + 1] : imagesList[0];

    const handleCancel = () => {
        resetImage();
        setOpened(!opened);
        navigate(`../${album._id}`);
    }

    useEffect(() => {
        if(opened) getImage(imageId, token);
        return () => {
            setOpenedDelete(false);
            setOpenedEdit(false);
            resetImage();
        }
    }, [getImage, resetImage, opened, imageId, token]);

    const handleOpenDeleteModal = () => setOpenedDelete(!openedDelete);
    const handleOpenEditModal = () => setOpenedEdit(!openedEdit);

    const deleteAlbumImage = () => {
        setOpened(!opened);
        navigate(`../${album._id}`);
        deleteImage(imageId, currentUser._id, token);
        if(group) deleteGroupAlbumPhoto(imageId);
        else deleteUserAlbumPhoto(imageId);
    }

    const editAlbumImage = (imageData) => {
        editImage(imageId, imageData, token);
        navigate(`../${imageData.album}/${imageId}`);
    }

    const changeProfilePicture = async () => {
        try{
            if(group) await GroupAPI.editGroupInfo(group._id, {userId: currentUser._id, profilePicture: image.imagefile}, token);
            else await UserAPI.modifyUser(currentUser._id, {id: profile._id, profilePicture: image.imagefile}, token);
        }catch(e){};
    }

    const changeCoverPicture = async () => {
        try{
            if(group) await GroupAPI.editGroupInfo(group._id, {userId: currentUser._id, coverPicture: image.imagefile}, token);
            else await UserAPI.modifyUser(currentUser._id, {id: profile._id, coverPicture: image.imagefile}, token);
        }catch(e){};
    }

    if(!opened) return <></>;

    return (
        <SimpleModalShell handleCancel={handleCancel}>
            <div className={classes.imageSection}>
                {!image || props.isFetching 
                    ? <Preloader/>
                    :   <div className={classes.imageContainer}>
                            <Link to={`../${album._id}/${previousImage}`} className={`${classes.navLink} ${classes.navLeft}`}><ChevronLeft className={classes.navIcon}/></Link>
                            <img src={image.imagefile} alt='' className={classes.image}/>
                            <Link to={`../${album._id}/${nextImage}`} className={`${classes.navLink} ${classes.navRight}`}><ChevronRight className={classes.navIcon}/></Link>
                        </div>
                }
            </div>
            <div className={classes.imageContent}>
                {!image || props.isFetching 
                    ? <Preloader/>
                    : <ImageModalContent image={image} currentUser={currentUser} profile={profile} group={group} album={album} openedDelete={openedDelete} setOpenedDelete={setOpenedDelete} deleteImage={deleteAlbumImage} handleOpenDeleteModal={handleOpenDeleteModal} openedEdit={openedEdit} setOpenedEdit={setOpenedEdit} editImage={editAlbumImage} handleOpenEditModal={handleOpenEditModal} changeProfile={changeProfilePicture} changeCover={changeCoverPicture}/>
                }
            </div>
        </SimpleModalShell>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        profile: state.profile.profile,
        group: state.group.group,
        album: state.groupAlbum.album,
        image: state.groupImage.image,
        imagesArray: state.groupImage.imagesArray,
        isFetching: state.groupImage.isFetching,
        error: state.groupImage.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getImage: (imageId, token) => {dispatch(getGroupImage(imageId, token))},
        resetImage: () => {dispatch(resetImage())},
        editImage: (imageId, imageData, token) => {dispatch(editGroupImage(imageId, imageData, token))},
        deleteImage: (imageId, userId, token) => {dispatch(deleteGroupImage(imageId, userId, token))},
        deleteGroupAlbumPhoto: (imageId) => {dispatch(deleteGroupAlbumPhoto(imageId))}, 
        deleteUserAlbumPhoto: (imageId) => {dispatch(deleteUserAlbumPhoto(imageId))}, 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageModal);