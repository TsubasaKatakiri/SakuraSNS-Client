import React from 'react';
import { Link } from 'react-router-dom';
import SimpleButton from '../../../components/MinorComponents/SimpleButton/SimpleButton';
import classes from './ResetComplete.module.scss';

const ResetComplete = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <h3 className={classes.headerText}>Password Reset Complete </h3>
                <p className={classes.caption}>Password was successfully reset.</p>
                <p className={classes.caption}>Now you can use your new password to log into your account.</p>
            </div>
            <div className={classes.footer}>
                <Link to='/'>
                    <SimpleButton>Log into account</SimpleButton>
                </Link>
            </div>
        </div>
    );
};

export default ResetComplete;