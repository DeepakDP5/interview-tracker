import React from 'react';
import {getUserSelector} from '../../redux/user/userSelector';
import {connect} from 'react-redux';
import FriendComponent from '../../components/friend/friendComponent';

function FriendsPage ({user}) {

    return (
        <div className="mr-auto ml-auto">
            <ol className="list-group">
                {
                    user?.friends.map(e => 
                        <FriendComponent user = {e} />
                    )
                }
            </ol>
        </div>
    )
}

const mapStateToProps = (state) =>({
    user : getUserSelector(state),
});

export default connect(mapStateToProps)(FriendsPage);