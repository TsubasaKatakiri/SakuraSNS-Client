import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.scss';
import {AuthAPI} from '../../api/AuthApi';
import LoginForm from '../../components/LoginForm/LoginForm';
import { loginUser } from '../../redux/Auth/AuthActions';
import { connect } from 'react-redux'
import SimpleButton from '../../components/MinorComponents/SimpleButton/SimpleButton';

const Login = (props) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async(values) => {
        const {email, password} = values;
        try {
            await AuthAPI.login(email, password);
            localStorage.setItem('firstLogin', true);
            props.loginUser();
            navigate('/profile');
        } catch (err) {
            setError(err.response.data.response.message);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <p>Welcome to the SakuraSNS Project!</p>
                <p>To use our services, please sign in.</p>
            </div>
            <div className={classes.main}>
                <LoginForm onSubmit={onSubmit} error={error}/>
                <Link to='/forgot-password' className={classes.link}>Forgot password?</Link>
            </div>
            <div className={classes.footer}>
                <span className={classes.caption}>Not a member? Sign up to the Social Network Project now and enjoy the experience of connection with friends and the world around you!</span>
                <Link to='/register'>
                    <SimpleButton>Sign up</SimpleButton>
                </Link>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: () => {dispatch(loginUser())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);