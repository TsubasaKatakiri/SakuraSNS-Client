import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './GroupAlbumsList.module.scss';
import Preloader from '../../../MinorComponents/Preloader/Preloader';
import { createNewGroupAlbum, getGroupAlbums, resetAlbums } from '../../../../redux/GroupAlbums/GroupAlbumsActions';
import GroupAlbumsList from './GroupAlbumsList';
import GroupPageContainer from './../../GroupPageContainer/GroupPageContainer';

const GroupAlbumsListContainer = ({currentUser, token, group, albums, getGroupAlbums, resetAlbums, createNewGroupAlbum, ...props}) => {
    const [modalOpened, setModalOpened] = useState(false);
    let groupId = useParams().groupId;

    const handleOpenModal = () => setModalOpened(!modalOpened);

    if(modalOpened) document.body.classList.add(classes.modalActive);
    else document.body.classList.remove(classes.modalActive);

    useEffect(() => {
        getGroupAlbums(groupId, token);
        return () => resetAlbums();
    }, []);

    const createMethod = (newAlbum) => {
        console.log(newAlbum);
        createNewGroupAlbum(newAlbum, token);
    }

    return (
        <GroupPageContainer>
            {!albums || props.isFetching ? <Preloader/> : <GroupAlbumsList currentUser={currentUser} group={group} albums={albums} modalOpened={modalOpened} setModalOpened={setModalOpened} handleOpenModal={handleOpenModal} createMethod={createMethod}/>}
        </GroupPageContainer>
    )
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
        group: state.group.group,
        albums: state.groupAlbums.albums,
        isFetching: state.groupAlbums.isFetching,
        error: state.groupAlbums.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroupAlbums: (groupId, token) => {dispatch(getGroupAlbums(groupId, token))},
        resetAlbums: () => {dispatch(resetAlbums())},
        createNewGroupAlbum: (albumData, token) => {dispatch(createNewGroupAlbum(albumData, token))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAlbumsListContainer);