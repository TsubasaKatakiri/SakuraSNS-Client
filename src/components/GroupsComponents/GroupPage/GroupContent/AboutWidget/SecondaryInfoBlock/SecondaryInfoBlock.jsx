import React from 'react';
import Preloader from '../../../../../MinorComponents/Preloader/Preloader';
import InfoListElement from '../InfoListElement/InfoListElement';
import classes from './SecondaryInfoBlock.module.scss';

const SecondaryInfoBlock = ({info, isFetching, error}) => {
    const isDark = document.body.classList.contains('dark');

    if(!info) return '';
    if(!info && isFetching) return <Preloader/>
    if(!info && error) return <span className={classes.message}>{error}</span>

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <h4 className={classes.header}>Info articles</h4>
            {info.length === 0 
                ? <span className={classes.message}>No info is present here currently.</span>
                : <>{info.map(i => {
                        return <InfoListElement key={i._id} info={i}/>
                    })}
                </>
            }
        </div>
    );
};

export default SecondaryInfoBlock;