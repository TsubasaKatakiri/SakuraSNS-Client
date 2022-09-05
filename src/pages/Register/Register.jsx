import React from 'react'; 
import { Link } from 'react-router-dom';
import classes from './Register.module.scss';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import SimpleButton from '../../components/MinorComponents/SimpleButton/SimpleButton';

const Register = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <RegisterForm/>
            </div>
            <div className={classes.footer}>
                <span className={classes.caption}>Already have an account?</span>
                <Link to='/'>
                    <SimpleButton className={classes.button}>Log into account</SimpleButton>
                </Link>
            </div>
        </div>
    );
};

export default Register;