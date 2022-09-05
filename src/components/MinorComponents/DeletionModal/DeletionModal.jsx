import React from 'react';
import classes from './DeletionModal.module.scss';
import SimpleButton from './../SimpleButton/SimpleButton';

const DeletionModal = ({caption, opened, setOpened, deleteMethod}) => {
    const isDark = document.body.classList.contains('dark');

    const handleRefuse = () => {
        setOpened(!opened);
    }

    const handleAccept = () => {
        setOpened(!opened);
        deleteMethod();
    }

    if(!opened) return <></>;

    return (
        <div className={classes.wrapper}>
            <div className={classes.overlay} onClick={handleRefuse}/>
            <div className={`${classes.modal} ${isDark ? classes.night : ''}`}>
                <div className={classes.header}>
                    <h3 className={classes.headerText}>Confirm deletion</h3>
                </div>
                <div className={classes.main}>
                    <p className={classes.caption}>{caption ? caption : 'Are you sure?'}</p>
                </div>
                <div className={classes.footer}>
                    <SimpleButton onClick={handleAccept}>Yes</SimpleButton>
                    <SimpleButton onClick={handleRefuse}>No</SimpleButton>
                </div>
            </div>
        </div>
    );
};

export default DeletionModal;