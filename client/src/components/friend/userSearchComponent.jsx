import React,{useState,useEffect} from 'react';
import ObjectProblemsetList from './objectProblemsetList';
import {getUserSelector} from '../../redux/user/userSelector';
import {connect} from 'react-redux';
import {removeFriend,addFriend,cancelRequest} from '../../api/index';
import { fetchUser } from '../../redux/user/userActions';
import {object} from '../../redux/object/objectSelector';
import {fetchObject} from '../../redux/object/objectAction'

function UserSearchComponent({object,user,fetchUser,fetchObject}) {
    const [isFriend,setIsFriend] = useState(0);  

    useEffect(() => {
       const state1 =  user?.friends?.find(el => el.username === object.username);
       const state2 = object?.friendRequests.find(el => el.username === user?.username);
       state1 ? setIsFriend(2) : (state2 ? setIsFriend(1):  setIsFriend(0)); ;
    },[user,object]);

    const handleRemoveFriend = async() => {
        try{
            await removeFriend(object?._id);
            fetchUser();
            fetchObject(object?.username);
        } catch(err){
            alert(err.response.data.message);
        }
    }

    const handleAddFriend = async() => {
        try{
            await addFriend(object?._id);
            fetchUser();
            fetchObject(object?.username);
        } catch(err){
            alert(err.response.data.message);
        }
    }

    const handleCancelRequest = async() => {
        try{
            const res = await cancelRequest(object?._id);
            console.log(res.data);
            fetchObject(object?.username);
        } catch(err){
            alert(err.response.data.message);
        }
    }


    const {username,email,problemsets,photo} = object;
    return (
        <div>
            {
                object ?             
                    <div>
                        <h6>{username}</h6>
                        <h6>{email}</h6>
                        <img src={`http://localhost:4000/images/user/${photo}`} alt={username}></img>
                        <ol className="list-group w-25">
                        {
                            problemsets.map(el => 
                                el.public ? <ObjectProblemsetList key = {el._id} list = {el}/> : null
                            )
                        }
                        </ol>
                        {
                            isFriend === 0 ? <button className="btn btn-primary" onClick={handleAddFriend} >Add Friend</button> : (isFriend === 1 ? <button  onClick={handleCancelRequest} className="btn btn-primary">Cancel Request</button> : <button className = "btn btn-primary" onClick={handleRemoveFriend}>Remove Friend</button>)
                        }
                        
                    </div>
                    : 
                    null 
         } 
        </div>
    )
};

const mapStateToProps = (state) => ({
    user : getUserSelector(state),
    object: object(state)
});
const mapDispatchToProps = (dispatch) => ({
    fetchUser:()=> dispatch(fetchUser()),
    fetchObject:(username) => dispatch(fetchObject(username)) 
})

export default connect(mapStateToProps,mapDispatchToProps)(UserSearchComponent);


