import React from 'react';
import classes from './LeftSidebar.module.scss'
import {Home, RssFeed, Message, People, Settings, Videocam, MusicNote} from '@material-ui/icons';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const LeftSidebar = ({currentUser}) => {
    const isDark = document.body.classList.contains('dark');

    return (
        <nav className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <ul className={classes.list}>
                <li className={classes.listItem}>
                    <Link to={`/profile/${currentUser._id}`} className={classes.link}>
                        <Home className={classes.linkIcon}/>
                        <span className={classes.linkText}>My page</span>
                    </Link>
                </li>
                <li className={classes.listItem}>
                    <Link to={'/feed'} className={classes.link}>
                        <RssFeed className={classes.linkIcon}/>
                        <span className={classes.linkText}>Feed</span>
                    </Link>
                </li>
                <li className={classes.listItem}>
                    <Link to={'/chat'} className={classes.link}>
                        <Message className={classes.linkIcon}/>
                        <span className={classes.linkText}>Messages</span>
                    </Link>
                </li>
                <li className={classes.listItem}>
                    <Link to={'/music'} className={classes.link}>
                        <MusicNote className={classes.linkIcon}/>
                        <span className={classes.linkText}>Music</span>
                    </Link>
                </li>
                <li className={classes.listItem}>
                    <Link to={'/video'} className={classes.link}>
                        <Videocam className={classes.linkIcon}/>
                        <span className={classes.linkText}>Video</span>
                    </Link>
                </li>
                <li className={classes.listItem}>
                    <Link to={'/groups'} className={classes.link}>
                        <GroupsIcon className={classes.linkIcon}/>
                        <span className={classes.linkText}>Groups</span>
                    </Link>
                </li>
                <li className={classes.listItem}>
                    <Link to={'/people'} className={classes.link}>
                        <People className={classes.linkIcon}/>
                        <span className={classes.linkText}>People</span>
                    </Link>
                </li>
                <li className={classes.listItem}>
                    <Link to={'/settings'} className={classes.link}>
                        <Settings className={classes.linkIcon}/>
                        <span className={classes.linkText}>Settings</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps)(LeftSidebar);