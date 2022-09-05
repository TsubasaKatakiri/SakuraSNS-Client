import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ForgotPassword.module.scss';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import SimpleButton from '../../components/MinorComponents/SimpleButton/SimpleButton';

const ForgotPassword = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <ForgotPasswordForm className={classes.loginMainPanelTop}/>
            </div>
            <div className={classes.footer}>
                <Link to='/'>
                    <SimpleButton>Return to login page</SimpleButton>
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;