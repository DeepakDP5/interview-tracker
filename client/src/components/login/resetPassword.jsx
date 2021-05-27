import React, {useState} from 'react';
import Form from '../form/formComponent';
import {useParams, useHistory} from 'react-router-dom';
import {resetPassword} from '../../api/index.js'


export default function ResetPassword() {
    const {token} = useParams();
    const history = useHistory();
    const [state, setstate] = useState({
        newPassword: '',
        confirmNP: ''
    });

    const handleChange = (e)=>{
        setstate({...state, [e.target.name]: e.target.value})
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await resetPassword(token, state);
            history.push('/login');
            console.log(res);
        } catch {
            alert('Something Went Wrong!');
        }
    };

    return (
        <form className = "w-25 m-auto" onSubmit = {handleSubmit} >
            <Form  name = "newPassword" value = {state.newPassword} type = "password" id = "#password" required = {true} handleChange = {handleChange} label = "Password" />
            <Form  name = "confirmNP" value = {state.confirmNP} type = "password" id = "#confirmPassword" required = {true} handleChange = {handleChange} label = "ConfirmPassword" />
            <button className = "btn btn-primary" type = "submit">Submit</button> 
        </form>
    )
}
