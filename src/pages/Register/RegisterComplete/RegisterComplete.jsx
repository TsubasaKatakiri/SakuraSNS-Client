import React from 'react';
import { Link } from 'react-router-dom';
import SimpleButton from '../../../components/MinorComponents/SimpleButton/SimpleButton';
import classes from './RegisterComplete.module.scss';

const RegisterComplete = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <h3 className={classes.headerText}>Sign up to the SakuraSNS Project</h3>
                <p className={classes.caption}>Congratulations, you have registered on the SakuraSNS Project.</p>
                <p className={classes.caption}> An email is sent to you for registration confirmation. Please confirm the registration in the next 24 hours.</p>
            </div>
            <div className={classes.footer}>
                <Link to='/'>
                    <SimpleButton className={classes.button}>Log into account</SimpleButton>
                </Link>
            </div>
        </div>
    );
};

export default RegisterComplete;