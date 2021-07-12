import React from 'react';
import {getUserSelector} from '../../redux/user/userSelector';
import {connect} from 'react-redux';
import FriendComponent from './friendComponent';
import FriendRequestComponent from './friendRequestComponent';
import './friendPage.scss';


function FriendListComponent({user}) {
    return (
        <div className = "wrapper1">
            <div className="friends">
                <h6 className = "heading">Friends</h6>
                <table className="friendItem">
                    {
                        user?.friends.map((e,i) => 
                            <FriendComponent key = {e._id} object = {e} index = {i+1} />
                        )
                    }
                </table>
            </div>
            
            <div className="friendRequest">
                <h6 className = "heading">Friend Requests</h6>
                <table className="friendRequestItem">
                    {
                        user?.friendRequests.map((e,i) => 
                            <FriendRequestComponent key = {e._id} object = {e} index = {i+1}/>
                        )
                    }
                </table>
            </div>
        </div>
    )
};

const mapStateToProps = (state) =>({
    user : getUserSelector(state),
});

export default connect(mapStateToProps)(FriendListComponent);
