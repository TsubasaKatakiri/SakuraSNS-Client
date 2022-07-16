import React from 'react';
import classes from './SecondaryInfo.module.scss';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';

const SecondaryInfo = ({profile}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            {profile.extraData.school || profile.extraData.university 
                ? <div className={classes.infoBlock}>
                    <span className={classes.infoName}><SchoolIcon className={classes.infoIcon}/>Education </span>
                    {profile.extraData.school 
                        ? <p className={classes.infoString}><span className={classes.infoCategory}>School: </span>{profile.extraData.school}</p> 
                        : ''
                    }
                    {profile.extraData.university 
                        ? <p className={classes.infoString}><span className={classes.infoCategory}>University: </span>{profile.extraData.university}</p> 
                        : ''
                    }
                </div>
                : ''
            }
            {profile.extraData.company 
                ? <div className={classes.infoBlock}>
                    <span className={classes.infoName}><BusinessIcon className={classes.infoIcon}/>Work </span>
                    <p className={classes.infoString}><span className={classes.infoCategory}>Company: </span>{profile.extraData.company}</p> 
                </div>
                : ''
            }
            <div className={classes.infoBlock}>
                <span className={classes.infoName}><AccountCircleIcon className={classes.infoIcon}/>Personal info </span>
                {profile.extraData.gender 
                    ? <p className={classes.infoString}><span className={classes.infoCategory}>Gender: </span>{profile.extraData.gender}</p> 
                    : ''
                }
                {profile.extraData.currentStatus 
                    ? <p className={classes.infoString}><span className={classes.infoCategory}>Current status: </span>{profile.extraData.currentStatus}</p> 
                    : ''
                }
            </div>
            {profile.extraData.aboutMe || profile.extraData.hobbies || profile.extraData.likes || profile.extraData.dislikes 
                ? <div className={classes.infoBlock}>
                    <span className={classes.infoName}><InfoIcon className={classes.infoIcon}/>About me </span>
                    {profile.extraData.aboutMe 
                        ? <p className={classes.infoString}><span className={classes.infoCategory}>About me: </span>{profile.extraData.aboutMe}</p> 
                        : ''
                    }
                    {profile.extraData.hobbies 
                        ? <p className={classes.infoString}><span className={classes.infoCategory}>Hobbies: </span>{profile.extraData.hobbies}</p> 
                        : ''
                    }
                    {profile.extraData.likes 
                        ? <p className={classes.infoString}><span className={classes.infoCategory}>Likes: </span>{profile.extraData.likes}</p> 
                        : ''
                    }
                    {profile.extraData.dislikes 
                        ? <p className={classes.infoString}><span className={classes.infoCategory}>Dislikes: </span>{profile.extraData.dislikes}</p> 
                        : ''
                    }
                </div>
                : ''
            }
        </div>
    );
};

export default SecondaryInfo;