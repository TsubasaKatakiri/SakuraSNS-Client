import React from 'react';
import InfoListCard from '../InfoListCard/InfoListCard';
import classes from './InfoList.module.scss';

const InfoList = ({infoList}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <h3 className={classes.header}>Group Articles</h3>
            {infoList.length === 0 
            ? <span className={classes.message}>No info is present here currently.</span>
            : <>{infoList.map(i => {
                return <InfoListCard key={i._id} info={i}/>
            })}</>}
        </div>
    );
};

export default InfoList;