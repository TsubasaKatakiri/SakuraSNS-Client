import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './UsersSettings.module.scss';
import SimpleButton from './../../../MinorComponents/SimpleButton/SimpleButton';

const UsersSettings = () => {
    const navigate = useNavigate();

    const navigationUserHandler = () => navigate(`./manageUsers`);

    return (
        <div className={classes.wrapper}>
            <SimpleButton onClick={navigationUserHandler}>Manage users</SimpleButton>
        </div>
    );
};

export default UsersSettings;