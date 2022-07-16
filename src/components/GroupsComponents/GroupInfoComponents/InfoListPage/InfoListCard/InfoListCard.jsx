import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './InfoListCard.module.scss';

const InfoListCard = ({info}) => {
    const groupId = useParams().groupId;
    const isDark = document.body.classList.contains('dark');
    let infoText = info.infoBlockText;
    if(infoText.length > 256) infoText = `${infoText.substring(0, 256)}...`;

    return (
        <Link to={`/groups/${groupId}/info/${info._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <h3 className={classes.name}>{info.infoBlockHeader}</h3>
            <span className={classes.text}>{infoText}</span>
        </Link>
    );
};

export default InfoListCard;