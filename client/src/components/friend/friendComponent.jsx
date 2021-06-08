import React from 'react';
import {Link} from 'react-router-dom';

export default function FriendComponent({user}) {
    return (
        <li className = "list-group-item d-flex pt-1 pb-1">
            <div><img src={`http://localhost:4000/images/user/${user.photo}`} width="10%" className="rounded-circle" alt = '' /></div>
            <Link to='#'>
                <div className="font-weight-bold text-primary">{user.username}</div>
            </Link>
        </li>
    )
}
