import React, { useEffect, useRef, useState } from 'react';
import classes from './Navbar.module.scss';
import './Navbar.css';
import noAvatar from '../../images/noAvatar.png';
import { Link, useNavigate } from 'react-router-dom'; 
import { io } from 'socket.io-client';
import NavbarMenu from './NavbarMenu/NavbarMenu';
import { connect } from 'react-redux';
import { logout, setOnlineUsers, switchDarkMode } from '../../redux/Auth/AuthActions';

const Navbar = ({currentUser, token, setOnlineUsers, logout, switchDarkMode}) => {
    const isDark = document.body.classList.contains('dark');
    const [isOpened, setIsOpened] = useState(false);
    const socket = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        socket.current = io('ws://localhost:8900');
    }, []);

    useEffect(()=>{
        socket.current.emit('addUser', currentUser._id);
        socket.current.on('getUsers', (users) => {
            setOnlineUsers(users);
        })
        return () => setOnlineUsers([]);
    }, [currentUser]);

    useEffect(() => {
        const closeDropdown = (e) => {
            if(!e.target.closest('#menu')) setIsOpened(!isOpened);
        }
        if(isOpened) document.body.addEventListener('click', closeDropdown);
        return () => document.body.removeEventListener('click', closeDropdown);
    }, [isOpened]);

    const logoutHandler = () => {
        setIsOpened(!isOpened);
        localStorage.removeItem('firstLogin');
        logout();
        navigate('/login');
    }

    const settingsHandler = () => {
        setIsOpened(!isOpened);
        navigate('/settings');
    }

    const profileHandler = () => {
        setIsOpened(!isOpened);
        navigate(`/profile/${currentUser._id}`);
    }

    const darkHandler = () => {
        switchDarkMode(currentUser._id, token);
    }

    const handleMenuOpen = () => setIsOpened(!isOpened);

    if(currentUser.userSettings.isDarkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');

    return (
        <header className={`${classes.navbar} ${isDark ? classes.night : ''}`}>
            <div className={classes.navbarContainer}>
                <Link to={`/profile/${currentUser._id}`} className={classes.navbarLogo}>SakuraSNS Project</Link>
                <div className={classes.navbarControls}>
                    <div className={classes.links}>
                        <Link to={`/profile/${currentUser._id}`} className={classes.link}>Homepage</Link>
                        <Link to={'/chat'} className={classes.link}>Messages</Link>
                        <Link to={'/feed'} className={classes.link}>Feed</Link>
                    </div>
                    <div className={classes.user}>
                        <img className={classes.userAvatar} src={currentUser.profilePicture ? currentUser.profilePicture : noAvatar} alt='' onClick={handleMenuOpen}/>
                        <NavbarMenu isOpened={isOpened} currentUser={currentUser} profileHandler={profileHandler} logoutHandler={logoutHandler} settingsHandler={settingsHandler} darkHandler={darkHandler}/>
                    </div>
                </div>
            </div>
        </header>
    );
};


const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser,
        token: state.auth.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {dispatch(logout())},
        switchDarkMode: (id, token) => {dispatch(switchDarkMode(id, token))},
        setOnlineUsers: (users) => {dispatch(setOnlineUsers(users))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);