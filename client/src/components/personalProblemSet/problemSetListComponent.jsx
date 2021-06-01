import React, {useState} from 'react';
import ListItem from './listItem';
import {addProblems} from '../../api/index';
import {addProblem} from '../../redux/user/userActions.js';
import {connect} from 'react-redux';
import NewListItemForm from './newListItemForm';



function ProblemSetListComponent({playlist, addProblem}) {

    const [formstate, setformstate] = useState(false);
    const [formdata, setformdata] = useState({
        title: '',
        topic: '',
        link: ''
    });

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await addProblems(playlist._id, formdata);
            addProblem(formdata, playlist._id);
            setformdata({
                title: '',
                topic: '',
                link: ''
            });
            setformstate(e => !e);
        } catch(err) {
            alert(err.response?.data?.message);
        }
    }

    return (
        <div>
            <h5>{playlist.name}</h5 >
            <ol className="list-group">
            {
                playlist?.list?.map((el, i) =>(
                    <ListItem key = {i} el = {el} />
                ))
            }
            </ol>

            <div>
                {
                    formstate ? 
                        <NewListItemForm handleSubmit = {handleSubmit} handleChange = {handleChange} {...formdata} />
                    :
                        <button className="btn btn-primary mt-3" onClick = {() => setformstate(e => !e)}>Add Problem</button>
                }
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) =>({
    addProblem: (data, id) => dispatch(addProblem(data,id)),
});


export  default connect(null, mapDispatchToProps)(ProblemSetListComponent);