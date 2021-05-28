import React from 'react';
import {Link} from 'react-router-dom';

function ProfileComponent({match}) {
    return (
        <div>
        <h2>PP</h2>
        <Link to = {`${match.url}/resetpassword`}>Change Password</Link>
        </div>
    )
}

export default ProfileComponent;