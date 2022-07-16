import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './RegisterConfirm.module.scss';
import { AuthAPI } from './../../../api/AuthApi';
import Preloader from './../../../components/MinorComponents/Preloader/Preloader';
import SimpleButton from './../../../components/MinorComponents/SimpleButton/SimpleButton';

const RegisterConfirm = () => {
    const token = useParams().registerKey;
    const [hasError, setHasError] = useState(false);
    const [activationProgress, setActivationProgress] = useState(false);

    useEffect(()=>{
        const activateAccount = async () => {
            try {
                setActivationProgress(true);
                await AuthAPI.activate(token);
            } catch (e) {
                setHasError(true);
            }
            setActivationProgress(false);
        }
        if(token) activateAccount();
    }, [token])

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                {token && !hasError ? <>
                    {activationProgress ? <>
                        <h3 className={classes.headerText}>Account Registration Confirmation...</h3>
                        <p className={classes.caption}>Please, wait, while SakuraSNS Project activates your account...</p>
                        <Preloader/>
                    </> : <>
                        <h3 className={classes.headerText}>Account Registration Confirmed</h3>
                        <p className={classes.caption}>Congratulations, you have confirmed your registraion on the SakuraSNS Project.</p>
                        <p className={classes.caption}>Now you're capable to login into your new account and use it.</p>
                    </>}
                </> : <>
                    <h3 className={classes.headerText}>Registration Confirmation Error</h3>
                    <p className={classes.caption}>An error has occured during account registration confirmation.</p>
                    <p className={classes.caption}>Please check your account registration confirmation link and try again.</p>
                </>}
            </div>
            <div className={classes.footer}>
                <Link to='/'>
                    <SimpleButton className={classes.button} disabled={activationProgress}>{token || hasError ? 'Log into account' : 'Return to main page'}</SimpleButton>
                </Link>
            </div>
        </div>
    );
};

export default RegisterConfirm;