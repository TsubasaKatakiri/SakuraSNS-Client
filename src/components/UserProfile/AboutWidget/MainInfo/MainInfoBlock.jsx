import React from 'react';
import { dateFormat } from '../../../../util/DateCalculations';
import classes from './MainInfoBlock.module.scss'
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MainInfoBlock = ({profile}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.infoBlock}>
                <span className={classes.infoName}><InfoIcon className={classes.infoIcon}/>General info: </span>
                {profile.birthdayDate 
                    ? <>
                        <p className={classes.infoString}><span className={classes.infoCategory}>Birthday: </span>{dateFormat(profile.birthdayDate)}</p>
                        <p className={classes.infoString}><span className={classes.infoCategory}>Age: </span>{profile.age}</p>
                    </>
                    : '' 
                }
                <p className={classes.infoString}><span className={classes.infoCategory}>Registered: </span>{dateFormat(profile.createdAt)}</p>
            </div>
            {profile.extraData.city || profile.extraData.country 
                ? <div className={classes.infoBlock}>
                    <span className={classes.infoName}><LocationOnIcon className={classes.infoIcon}/>Location: </span>
                    <span className={classes.infoString}>
                        {profile.extraData.city }
                        {profile.extraData.city  && profile.extraData.country ? ', ' : ''}
                        {profile.extraData.country}
                    </span>
                </div>
                : ''
            }
        </div>
    );
};

export default MainInfoBlock;