import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SimpleButton from '../../../components/MinorComponents/SimpleButton/SimpleButton';
import ResetPasswordForm from '../../../components/ResetPasswordForm/ResetPasswordForm';
import classes from './ResetPassword.module.scss';

const ResetPassword = () => {
    const token = useParams().token;

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                {token ? 
                    <ResetPasswordForm token={token}/>
                : <>
                    <h3 className={classes.headerText}>Password Reset Error</h3>
                    <p className={classes.caption}>Please check your password reset link and try again.</p>
                </>}
            </div>
            <div className={classes.footer}>
                <Link to='/login'>
                    <SimpleButton>Return to login page</SimpleButton>
                </Link>
            </div>
        </div>
    );
};

export default ResetPassword;