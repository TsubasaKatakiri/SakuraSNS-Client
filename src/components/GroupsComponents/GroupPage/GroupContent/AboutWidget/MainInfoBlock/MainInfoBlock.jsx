import React from 'react';
import classes from './MainInfoBlock.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import TopicIcon from '@mui/icons-material/Topic';

const MainInfoBlock = ({group}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.infoBlock}>
                <span className={classes.infoName}><InfoIcon className={classes.infoIcon}/>About us: </span>
                <p className={classes.infoText}>{group.description}</p>
            </div>
            <div className={classes.infoBlock}>
                <span className={classes.infoName}><TopicIcon className={classes.infoIcon}/>Theme: </span>
                <p className={classes.infoText}>{group.theme}</p>
            </div>
            {group.groupCity || group.groupCountry 
                ? <div className={classes.infoBlock}>
                    <span className={classes.infoName}><LocationOnIcon className={classes.infoIcon}/>Our location: </span>
                    <span className={classes.infoString}>
                        {group.groupCity }
                        {group.groupCity  && group.groupCountry  ? ', ' : ''}
                        {group.groupCountry }
                    </span>
                </div>
                : ''
            }
        </div>
    )
};

export default MainInfoBlock;