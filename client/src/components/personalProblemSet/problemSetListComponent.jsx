import React, {useState} from 'react';
import ListItem from './listItem';
import Form from '../form/formComponent';
import {addProblems} from '../../api/index';
import {addProblem} from '../../redux/user/userActions.js';
import {connect} from 'react-redux';

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
                    <ListItem key = {el._id} el = {el} />
                ))
            }
            </ol>

            <div>
                {
                    formstate ?
                        <div>
                            <br/>
                            <button className="btn btn-primary" onClick = {() => setformstate(e => !e)}>Change State</button>
                            <br/>
                            <form onSubmit = {handleSubmit}>
                                <Form name = "title" type = "text" value = {formdata.title} className="form-control" id="#title" handleChange = {handleChange} required = {true} label = "Title"/>
                                <Form name = "link" type = "text" value = {formdata.link} className="form-control" id="#link" handleChange = {handleChange} required = {true} label = "Link"/>
                                <Form name = "topic" type = "text" value = {formdata.topic} className="form-control" id="#topic" handleChange = {handleChange} required = {false} label = "Topic"/>
                                <input type = "submit" className="btn btn-primary" value = "submit"/>
                            </form>
                        </div>
                    :
                        <button className="btn btn-primary" onClick = {() => setformstate(e => !e)}>Add Problem</button>
                }
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) =>({
    addProblem: (data, id) => dispatch(addProblem(data,id)),
});


export  default connect(null, mapDispatchToProps)(ProblemSetListComponent);