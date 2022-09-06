import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getToken, loginUser, getUserInfo } from './redux/Auth/AuthActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { AuthAPI } from './api/AuthApi';
import Preloader from './components/MinorComponents/Preloader/Preloader';
import Main from './pages/Main/Main';
import MainUnlogged from './pages/MainUnlogged/MainUnlogged';

function App({token, isAuthenticated, getToken, loginUser, getUserInfo}) {
  const firstLogin = localStorage.getItem("firstLogin");

  useEffect(() => {
    if(firstLogin){
      const acquireAccessToken = async () => {
        const res = await AuthAPI.getAccessToken();
        getToken(res.accessToken);
      }
      acquireAccessToken();
    }
  }, [isAuthenticated, getToken, firstLogin]);

  useEffect(() => {
    if(token){
      const acquireUserData = async () => {
        loginUser();
        const res = await AuthAPI.getUserData(token);
        getUserInfo(res);
      }
      acquireUserData();
    }
  }, [token, loginUser, getUserInfo])

  if(!firstLogin){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainUnlogged/>}/> 
        </Routes>
      </BrowserRouter>
    )
  }

  if(firstLogin && !isAuthenticated){
    return <Preloader/>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main/>}/> 
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps=(state)=>{
  return{
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    getToken: (token) => dispatch(getToken(token)),
    loginUser: () => dispatch(loginUser()),
    getUserInfo: (data) => dispatch(getUserInfo(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
