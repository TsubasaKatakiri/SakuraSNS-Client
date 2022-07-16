import React from 'react';
import ModalShell from '../../../../MinorComponents/ModalShell/ModalShell';
import SimpleButton from '../../../../MinorComponents/SimpleButton/SimpleButton';
import classes from './AlbumDeletionModal.module.scss';

const AlbumDeletionModal = ({album, opened, setOpened, deletePreserveMethod, deleteFullMethod}) => {
    const isDark = document.body.classList.contains('dark');

    const handleCancel = () => {
        setOpened(!opened);
    }

    const handleDeletePreserve = () => {
        deletePreserveMethod(album);
        setOpened(!opened);
    }

    const handleDeleteFull = () => {
        deleteFullMethod(album);
        setOpened(!opened);
    }

    if(!opened) return <></>;

    return (
        <ModalShell handleCancel={handleCancel} caption={'Delete this album'}>
            <div className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.main}>
                    <h5 className={classes.header}>Caution!</h5>
                    <p className={classes.text}>You are about to delete this album.</p>
                    <p className={classes.text}>You can choose two options: preserved deletion and full deletion.</p>
                    <p className={classes.text}>If you choose preserved deletion, all images in this album will be transferred to the main album and will not be deleted. Only album folder will be deleted.</p>
                    <p className={classes.text}>If you choose full deletion, the album and ALL images in it will be deleted.</p>
                    <p className={classes.text}>This action cannot be undone.</p>
                    <p className={classes.text}>Do you want to delete this album?</p>
                </div>
                <div className={classes.footer}>
                    <SimpleButton type='button' onClick={handleDeleteFull}>Full deletion</SimpleButton>
                    <SimpleButton type='button' onClick={handleDeletePreserve}>Preserved deletion</SimpleButton>
                    <SimpleButton type='button' onClick={handleCancel}>Cancel</SimpleButton>
                </div>
            </div>
        </ModalShell>
    );
};

export default AlbumDeletionModal;