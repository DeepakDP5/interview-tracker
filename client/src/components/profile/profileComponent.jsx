import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {getUserSelector} from '../../redux/user/userSelector';
import { connect } from 'react-redux';
import Form from '../form/formComponent';
import {updateDetails} from '../../api/index';
import {updatePhoto} from '../../redux/user/userActions';

import './profileComponent.scss';

function ProfileComponent({match, user, updatePhoto}) {

    const [file, setfile] = useState(null);
    const [email, setemail] = useState('');
    const [state, setstate] = useState(false);

    let value = '';

    if (user) {
        value = user.email;
    }

    const handleEmailChange = (e) => {
        console.log(e);
        setemail(e.target.value);
    }

    const handlePhotoChange = (event) => {
        console.log(event.target.files[0]);
        setfile(event.target.files[0]);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        console.log(email);

        let data = new FormData();
        data.append('photo', file);
        try {
            const res = await updateDetails(data);
            console.log(res);
            updatePhoto(res.data.photo);
            setstate(e => !e);
        } catch(err) {
            alert(err.response.data.message)
        }
        
    };

    return (
        <div>
            <h2>Profile Page</h2>

            <div className="container">
                <img src={`http://localhost:4000/images/user/${user?.photo}`} className="img-fluid img-thumbnail img" alt="default"></img>
                <h3 className="username">{user?.username}</h3>
            </div>
            <div>
                <Link to = {`${match.url}/resetpassword`}>Change Password</Link>
            </div>

            <div>
                <form onSubmit = {handleSubmit} encType = "multipart/form-data">
                    {
                        user ?
                            <Form name = "updateemail" type="email" className="form-control" id="email" handleChange = {handleEmailChange} placeholder = {value} label="Update Email"/>
                        :
                            null
                    }
                    
                    <Form name = "updatephoto" type="file" className="form-control" id="photo" handleChange = {handlePhotoChange} label="Update Profile Photo"/>
                    <button className = "btn btn-primary" type = "submit">Update Profile</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    updatePhoto: (data) => dispatch(updatePhoto(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);