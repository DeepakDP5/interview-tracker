import React, {useState,useEffect} from 'react';
import ListItem from './listItem';
import {addProblems,handleTogglePP} from '../../api/index';
import {addProblem} from '../../redux/user/userActions.js';
import {connect} from 'react-redux';
import NewListItemForm from './newListItemForm';
import ModalWrapper from '../../components/modal/modal';
import{fetchUser} from '../../redux/user/userActions';

const Modal = ModalWrapper(NewListItemForm);


function ProblemSetListComponent({playlist, addProblem,fetchUser}) {

    const [modalShow, setModalShow] = useState(false);
    const [formdata, setformdata] = useState({
        title: '',
        topic: '',
        link: ''
    });

    useEffect(() => {
        setModalShow(false);
    },[playlist]);

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setModalShow(false);
            await addProblems(playlist._id, formdata);
            addProblem(formdata, playlist._id);
            setformdata({
                title: '',
                topic: '',
                link: ''
            });
           
        } catch(err) {
            alert(err.response?.data?.message);
        }
    };

    const handleToggle = async(id) => {
        try {
            await handleTogglePP(id);
            fetchUser();
        }catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <h5>{playlist.name}</h5>
            <div className="form-check ml-auto">
                <input className="form-check-input" type="checkbox" value="" id= {`${playlist._id}`} checked = {playlist.public} onChange = {() => handleToggle(playlist._id)}/>
            </div> 
            <br/>
            <ol className="list-group">
            {
                playlist?.list?.map((el, i) =>(
                    <ListItem key = {i} el = {el} sid = {playlist._id} />
                ))
            }
            </ol>

            <div>
                {
                    modalShow ? null
                    :
                    <button className="btn btn-primary mt-3" onClick = {() => setModalShow(true)}>Add Problem</button>
                }
                <Modal onHide={() => setModalShow(false)} show = {modalShow} handleSubmit = {handleSubmit} handleChange = {handleChange} {...formdata}/>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) =>({
    addProblem: (data, id) => dispatch(addProblem(data,id)),
    fetchUser : () => dispatch(fetchUser()),
});



export  default connect(null, mapDispatchToProps)(ProblemSetListComponent);