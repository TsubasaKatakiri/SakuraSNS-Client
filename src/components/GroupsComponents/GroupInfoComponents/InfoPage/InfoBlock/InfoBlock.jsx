import React from 'react';
import { checkPolicy } from '../../../../../util/CheckPolicy';
import SimpleButton from '../../../../MinorComponents/SimpleButton/SimpleButton';
import classes from './InfoBlock.module.scss';

const InfoBlock = ({currentUser, group, infoBlock, handleOpenEdit, handleOpenDelete}) => {
    const isAllowed = checkPolicy(group, currentUser._id, group.policies.canEditGroupInfo);
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <div className={classes.header}>
                <h3 className={classes.name}>{infoBlock.infoBlockHeader}</h3>
                <div className={classes.controls}>
                    {isAllowed
                        ? <>
                            <SimpleButton onClick={handleOpenEdit}>Edit</SimpleButton>                                
                            <SimpleButton onClick={handleOpenDelete}>Delete</SimpleButton>
                        </>
                        : ''
                    }
                </div>
            </div>
            <div className={classes.main}>
                <p className={classes.description}>{infoBlock.infoBlockText}</p>
                {infoBlock.infoBlockImages.map(i => {
                    return <img src={i.file} alt='' key={i._id} className={classes.image}/>
                })}
            </div>
        </div>
    );
};

export default InfoBlock;