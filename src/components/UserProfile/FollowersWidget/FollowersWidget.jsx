import React from 'react';
import { connect } from 'react-redux';
import MembersShell from '../FollowingsWidget/MembersShell/MembersShell';

const FollowersWidget = ({profile, onlineUsers}) => {
    let followers = profile.followers;

    return <MembersShell profile={profile} users={followers} onlineUsers={onlineUsers} followingsMode={false}/>
};

const mapStateToProps = (state) => {
    return{
        onlineUsers: state.auth.onlineUsers,
    }
}

export default connect(mapStateToProps)(FollowersWidget);