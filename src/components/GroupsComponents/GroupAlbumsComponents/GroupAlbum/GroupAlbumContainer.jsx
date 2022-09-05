import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addGroupImage, deleteGroupAlbumFull, deleteGroupAlbumPreserve, editGroupAlbum, getGroupAlbum, lockGroupAlbum, privateGroupAlbum, resetAlbum } from '../../../../redux/GroupAlbum/GroupAlbumActions';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import GroupAlbum from './GroupAlbum';
import classes from './GroupAlbum.module.scss';
import GroupPageContainer from './../../GroupPageContainer/GroupPageContainer';

const GroupAlbumContainer = ({currentUser, token, group, album, getGroupAlbum, resetAlbum, editGroupAlbum, addGroupImage, deleteGroupAlbumPreserve, deleteGroupAlbumFull, ...props}) => {
    const groupId = useParams().groupId;
    const albumId = useParams().albumId;
    const imageId = useParams().imageId;
    const [modalAddOpened, setModalAddOpened] = useState(false);
    const [modalUpdateOpened, setModalUpdateOpened] = useState(false);
    const [modalDeleteOpened, setModalDeleteOpened] = useState(false);
    const [modalImageOpened, setModalImageOpened] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(imageId) {
            setModalImageOpened(true);
        } else {
            setModalImageOpened(false);
        }
    }, [imageId]);

    useEffect(()=>{
        getGroupAlbum(albumId, {groupId, userId: currentUser._id}, token);
        return () => resetAlbum();
    }, []);

    const handleOpenAddModal = () => setModalAddOpened(!modalAddOpened);
    const handleOpenUpdateModal = () => setModalUpdateOpened(!modalUpdateOpened);
    const handleOpenDeleteModal = () => setModalDeleteOpened(!modalDeleteOpened);

    if(modalAddOpened || modalUpdateOpened || modalDeleteOpened || modalImageOpened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    const addMethod = (newImage) => {
        addGroupImage(newImage, token);
    }

    const updateMethod = (albumData) => {
        editGroupAlbum(albumId, albumData, token);
    }

    const deletePreserveMethod = () => {
        deleteGroupAlbumPreserve(albumId, currentUser._id, token);
        navigate(`../`);
    }

    const deleteFullMethod = () => {
        deleteGroupAlbumFull(albumId, currentUser._id, token);
        navigate(`../`);
    }

    return (
        <GroupPageContainer>
            {!album || props.isFetching ? <Preloader/> : <GroupAlbum currentUser={currentUser} token={token} group={group} album={album} addMethod={addMethod} addOpened={modalAddOpened} setAddOpened={setModalAddOpened} handleOpenAddModal={handleOpenAddModal} deleteOpened={modalDeleteOpened} setDeleteOpened={setModalDeleteOpened} handleOpenDeleteModal={handleOpenDeleteModal} deletePreserveMethod={deletePreserveMethod} deleteFullMethod={deleteFullMethod} updateMethod={updateMethod} handleOpenUpdateModal={handleOpenUpdateModal} updateOpened={modalUpdateOpened} setUpdateOpened={setModalUpdateOpened} lockAlbum={props.lockGroupAlbum} privateAlbum={props.privateGroupAlbum} imageOpened={modalImageOpened} setImageOpened={setModalImageOpened}/>}
        </GroupPageContainer>
    )
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        album: state.groupAlbum.album,
        isFetching: state.groupAlbum.isFetching,
        error: state.groupAlbum.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroupAlbum: (albumId, groupData, token) => {dispatch(getGroupAlbum(albumId, groupData, token))},
        resetAlbum: () => {dispatch(resetAlbum())},
        lockGroupAlbum: (albumId, userId, token) => {dispatch(lockGroupAlbum(albumId, userId, token))},
        privateGroupAlbum: (albumId, userId, token) => {dispatch(privateGroupAlbum(albumId, userId, token))},
        editGroupAlbum: (albumId, albumData, token) => {dispatch(editGroupAlbum(albumId, albumData, token))},
        addGroupImage: (imageData, token) => {dispatch(addGroupImage(imageData, token))},
        deleteGroupAlbumPreserve: (albumId, userId, token) => {dispatch(deleteGroupAlbumPreserve(albumId, userId, token))},
        deleteGroupAlbumFull: (albumId, userId, token) => {dispatch(deleteGroupAlbumFull(albumId, userId, token))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAlbumContainer);