import React from 'react';
import { checkIfAdministrative } from '../../../../../util/CheckPolicy';
import ProfileShell from '../../../../MinorComponents/ProfileShell/ProfileShell';
import SimpleButton from '../../../../MinorComponents/SimpleButton/SimpleButton';
import classes from './GroupHeader.module.scss'; 

const GroupHeader = ({currentUser, group, member, isBanned, navigateSettings, handleRequest, handleJoining, joining, requested}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <ProfileShell cover={group.coverPicture} avatar={group.profilePicture}>
            <div className={classes.bottomInfo}>
                <h3 className={classes.username}>{group.groupname}</h3>
                <span className={classes.groupInfo}>{group.policies.isPrivate ? 'Private group' : 'Public group'}</span>
                <span className={classes.groupInfo}>{group.policies.isFreeJoin ? 'Free to join' : 'Restricted to joining'}</span>
                <span className={classes.about}>{group.description}</span>
            </div>
            <div className={classes.bottomFunctions}>
                    {checkIfAdministrative(group, currentUser._id) && member
                    ? <SimpleButton onClick={navigateSettings}>Group Settings</SimpleButton>
                    : ''
                    }
                    {isBanned 
                    ? <SimpleButton disabled={true}>User is banned</SimpleButton>
                    :   <> {!group.policies.isFreeJoin
                            ?   <SimpleButton onClick={handleRequest} disabled = {joining || requested}>
                                    {member ? (joining ? 'Leaving group...' : 'Leave group')
                                    : (requested
                                        ? 'Request placed'
                                        : (joining ? 'Making request...' : 'Request joining')
                                    )
                                }
                                </SimpleButton>
                            :   <SimpleButton onClick={handleJoining} disabled = {joining || isBanned || requested}>
                                    {member 
                                    ? (joining ? 'Joining group...' : 'Leave group') 
                                    : (joining ? 'Leaving group...' : 'Join to group')}
                                </SimpleButton>
                    }</>}
                </div> 
        </ProfileShell>
    );
};

export default GroupHeader;