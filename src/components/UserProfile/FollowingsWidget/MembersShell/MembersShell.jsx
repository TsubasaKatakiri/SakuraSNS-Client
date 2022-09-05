import React from 'react';
import SimpleFriendEntry from '../../../MinorComponents/SimpleFriendEntry/SimpleFriendEntry';
import WidgetShell from '../../../MinorComponents/WidgetShell/WidgetShell';
import classes from './MembersShell.module.scss';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import Preloader from '../../../MinorComponents/Preloader/Preloader';

const MembersShell = ({profile, users, onlineUsers, group, followingsMode, isFetching, error}) => {
    if((!users && !isFetching) || users.length === 0) return <></>;
    if(users.length > 6 ) users = users.slice(0, 6);
    const isDark = document.body.classList.contains('dark');

    return (
        <WidgetShell>
            <section className={`${classes.content} ${isDark ? classes.night : ''}`}>
                <div className={classes.infoTop}>
                    <div className={classes.logo}>
                        <GroupIcon className={classes.logoIcon}/>
                        <h3 className={classes.logoCaption}>
                            {group 
                                ? 'Group members' 
                                : <>{followingsMode 
                                        ? `${profile.lastName}'s followings`
                                        : `${profile.lastName}'s followers`
                                    }
                                </>
                            }
                            &nbsp;({users.length})
                        </h3>
                    </div>
                    <div className={classes.controlsBlock}>
                        <Link to={
                            group 
                            ? './people'
                            : followingsMode ? `/people/${profile._id}/friends` : `/people/${profile._id}/followers`
                        } className={classes.control}>More...</Link>
                    </div>
                </div>
                <div className={classes.infoBottom}>
                     {isFetching || !users
                        ? <Preloader/>
                        : <>{error && !users
                            ? <span className={classes.message}>{error}</span>
                            : <>{users.map(f => {
                                    return <SimpleFriendEntry key={f._id} friend={f} onlineUsers={onlineUsers}/>
                                })}
                            </>
                        }</>
                    }
                </div>
            </section>
        </WidgetShell>
    );
};

export default MembersShell;