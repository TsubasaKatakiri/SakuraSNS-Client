import React from 'react';
import { connect } from 'react-redux';
import MembersShell from './MembersShell/MembersShell';

const FollowingsWidget = ({profile, onlineUsers}) => {
    let followings = profile.followings;

    return <MembersShell profile={profile} users={followings} onlineUsers={onlineUsers} followingsMode={true}/>
};

const mapStateToProps = (state) => {
    return{
        onlineUsers: state.auth.onlineUsers,
    }
}

export default connect(mapStateToProps)(FollowingsWidget);