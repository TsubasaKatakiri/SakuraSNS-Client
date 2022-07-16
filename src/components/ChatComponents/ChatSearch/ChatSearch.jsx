import React, { useEffect, useState } from 'react';
import { UserAPI } from '../../../api/UserApi';
import classes from './ChatSearch.module.scss';
import avatar from '../../../images/noAvatar.png';

const ChatSearch = ({token, currentUser, createConversation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [foundEntries, setFoundEntries] = useState([]);

    const isDark = currentUser.userSettings.isDarkMode;

    useEffect(() => {
        const findUsers = async() => {
            const res = await UserAPI.search({search: searchQuery}, token);
            const users = res.users.filter(user => user._id !== currentUser._id);
            setFoundEntries(users);
        };
        if(searchQuery !== ''){
            findUsers();
        }else{
            setFoundEntries([]);
        }
    }, [searchQuery, token, currentUser]);

    const handleChoice = (entry) => {
        createConversation(entry._id);
        setFoundEntries([]);
        setSearchQuery('');
    }

    return (
        <div className={`${classes.wrapper} ${isDark ? classes.night : ''}`}>
            <input type='text' placeholder = 'Search for people...' className={classes.input} onChange={e => setSearchQuery(e.currentTarget.value)} value={searchQuery}/>
            {foundEntries.length > 0 && searchQuery !== '' ? (
                <div className={classes.results}>
                    <ul className={classes.list}>
                        {foundEntries.map(entry => {
                            return (
                                <li className={classes.entry} key={entry._id} onClick={() => handleChoice(entry)}>
                                    <img src={entry.profilePicture ? entry.profilePicture : avatar} alt='' className={classes.avatar}/>
                                    <span className={classes.username}>{entry.username}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
             ) : ''}
        </div>
    );
};

export default ChatSearch;