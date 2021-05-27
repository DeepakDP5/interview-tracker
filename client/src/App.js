import React, {useEffect, useState} from 'react'
import Header from './components/header/header';
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import ProblemSet from './pages/problemset/problemSet';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/login';
import {fetchUser, logoutUser} from './redux/user/userActions';
import {connect} from 'react-redux';
import ForgotPasswordPage from './pages/login/forgotPassword';
import ProfilePage from './pages/user/profilePage';
import {getUserSelector} from './redux/user/userSelector';

import './App.scss';

const Home = () => {
    return <Redirect to= "/problemset"/>;
}

const Logout = ({fn}) => {
    console.log(fn);
    fn();
    return <Redirect to = '/problemset'/>
};

const Error404 = () => {
    return <h1>Error</h1>;
}

const App = ({fetchUser,logoutUser, user}) => {

    const [state, setState] = useState(null);

    useEffect(() => {
        fetchUser();
        setState(user);
    }, []);

    return (
        <div>
        <Header/>
            <Switch>
                <Route exact path='/'><Home/></Route>
                <Route path='/problemset' component={ ProblemSet }/>
                <Route path='/login' component={ Login }/>
                <Route path='/logout'><Logout fn = {logoutUser}/></Route>
                <Route path='/forgotpassword' component={ForgotPasswordPage}></Route>
                <Route path='/profile' component = {ProfilePage}></Route>
                <Route path = '*' component = {Error404}/>
            </Switch>
        </div>
    );
};


const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
    logoutUser: () => dispatch(logoutUser())
});

const mapStateToProps = (state) => ({
    user: getUserSelector(state)
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));