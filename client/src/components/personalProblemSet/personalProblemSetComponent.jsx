import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {useLocation,useHistory} from 'react-router-dom';
import queryString from 'query-string';
import ProblemSetListComponent from './problemSetListComponent';
import ProblemSetItem from './problemSetItem';
import {addList} from '../../api/index';
import CreateProblemset from './createProblemset';
import {addAList} from '../../redux/user/userActions';



import './list.scss';


function PersonalProblemSetComponent({user,addAList}) {

    const loc  = useLocation();
    const history = useHistory();
    let val = queryString.parse(loc.search);

    const [showForm,setShowForm] = useState(false);

    const [formData,setFormData] = useState({
        name: '',
    });
    const handleChange = (e)=>{
        setFormData({
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
           const res = await addList(formData);
           addAList(res.data.updatedProblemSet.problemsets);
            setShowForm((e) => !e);
            setFormData({
                name: '',
            });        
        } catch(err){
            alert(err.response?.data?.message);
        }
    }

    useEffect(()=>{
        console.log(showForm);
    },[showForm])

    const func = (name)=>{
        history.push(`${loc.pathname}?name=${name}`)
    };
    let playlist = {};
    if(user){
        playlist = user.problemsets.find(el => el.name === val.name) || [];
    }
    return (
        <div className = "d-flex justify-content-start flex-wrap">
            <ol className="playlists">
            {
                user ? 
                user.problemsets.map(e => (
                    <ProblemSetItem key = {e._id} func = {func} el = {e}/>
                ))
                :
                null
            }
            {
                showForm ? <CreateProblemset handleSubmit = {handleSubmit} handleChange = {handleChange} {...formData} /> : <button onClick={() => setShowForm((e) => !e) }  className="btn btn-primary mt-3">Add List</button>
            }
            </ol>
            <div className = "list">
            {
                (user && val.name) ?
                <ProblemSetListComponent playlist={playlist}/> : null
            }
            </div>

        </div>
    )
};

const mapStateToProps = (state) =>({
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
    addAList: (data) => dispatch(addAList(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalProblemSetComponent);
