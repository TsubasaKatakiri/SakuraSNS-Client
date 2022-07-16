import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './InfoListElement.module.scss';

const InfoListElement = ({info}) => {
    const groupId = useParams().groupId;
    const isDark = document.body.classList.contains('dark');

    return (
        <Link to={`/groups/${groupId}/info/${info._id}`} className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <h3 className={classes.name}>{info.infoBlockHeader}</h3>
        </Link>
    );
};

export default InfoListElement;