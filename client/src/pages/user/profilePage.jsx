import React from 'react';
import {connect} from 'react-redux';
import {getUserSelector, isLoaded} from '../../redux/user/userSelector.js';
import {Switch, Route, useHistory, useLocation, Redirect} from 'react-router-dom';
import ResetPassword from '../../components/login/resetPassword'

const Temp = () => {
    return (
        <h2>PP</h2>
    )
}

const ProfilePage = ({user, isLoaded}) => {
    const history = useHistory();
    const location = useLocation();
    console.log(user);
    if (!user) {
        console.log('Not User');
        return <Redirect to = '/login'></Redirect>;
    }

    console.log(location);
    return (
        <div>
            <Switch>
                <Route exact path = {'/profile'} component = {Temp}></Route>
                <Route exact path = {'/profile/resetpassword'} component = {ResetPassword}></Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
    isLoaded: isLoaded(state)
});
  
export default connect(mapStateToProps)(ProfilePage);