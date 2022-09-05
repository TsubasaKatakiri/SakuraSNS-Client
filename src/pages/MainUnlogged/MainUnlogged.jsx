import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import classes from './MainUnlogged.module.scss' 
import Login from './../Login/Login';
import Register from './../Register/Register';
import ForgotPassword from './../ForgotPassword/ForgotPassword';
import RegisterComplete from './../Register/RegisterComplete/RegisterComplete';
import RegisterConfirm from '../Register/RegisterConfirm/RegisterConfirm';
import ResetComplete from '../ForgotPassword/ResetComplete/ResetComplete';
import ResetPassword from '../ForgotPassword/ResetPassword/ResetPassword';

const MainUnlogged = () => {
    return (
        <div className={classes.pageWrapper}>
            <div className={classes.pageHeader}>
                <Link to={'/'} className={classes.logo}>SakuraSNS Project</Link>
            </div>
            <div className={classes.pageMain}>
                <div className={classes.pageMainFace}>
                    <div className={classes.pageContent}>
                        <Routes>
                            <Route path='/' element={<Navigate to='/login'/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/forgot-password' element={<ForgotPassword/>}/>
                            <Route path='/reset-password' element={<ResetPassword/>}/>
                            <Route path='/reset-password/:token' element={<ResetPassword/>}/>
                            <Route path='/reset-complete' element={<ResetComplete/>}/>
                            <Route path='/register-complete' element={<RegisterComplete/>}/>
                            <Route path='/register-confirm' element={<RegisterConfirm/>}/>
                            <Route path='/register-confirm/:registerKey' element={<RegisterConfirm/>}/>
                            <Route path='/*' element={<Navigate to='/login'/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
            <div className={classes.pageFooter}>
                <p className={classes.footerText}>&copy; {new Date().getFullYear()} Katakiri Tsubasa / SakuraSNS Project</p>
            </div>
        </div>
    );
};

export default MainUnlogged;