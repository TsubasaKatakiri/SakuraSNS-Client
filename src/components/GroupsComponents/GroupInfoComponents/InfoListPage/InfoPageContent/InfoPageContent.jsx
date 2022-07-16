import React from 'react';
import InfoListHeader from '../InfoListHeader/InfoListHeader';
import classes from './InfoPageContent.module.scss';
import MainInfoBlock from './../../../GroupPage/GroupContent/AboutWidget/MainInfoBlock/MainInfoBlock';
import InfoList from '../InfoList/InfoList';
import Preloader from '../../../../MinorComponents/Preloader/Preloader';
import InfoCreationModal from '../InfoCreationModal/InfoCreationModal';

const InfoPageContent = ({currentUser, token, group, infoList, isFetching, error, handleOpen, opened, setOpened, addMethod}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <InfoListHeader currentUser={currentUser} group={group} handleOpen={handleOpen}/>
            <div className={classes.content}>
                <MainInfoBlock group={group}/>
                {!infoList || isFetching
                    ? <Preloader/>
                    : <>{!infoList && error 
                        ? <span className={classes.message}>{error}</span>
                        : <InfoList infoList={infoList}/>}
                    </>
                }
            </div>
            <InfoCreationModal currentUser={currentUser} token={token} group={group} opened={opened} setOpened={setOpened} addMethod={addMethod}/>
        </div>
    );
};

export default InfoPageContent;