import React, {useState, useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserSelector} from '../../redux/user/userSelector';
import {toggleSolved} from '../../api/index';
import {toggleSolvedAction} from '../../redux/user/userActions';

function Question({ question, user, checked, toggleSolvedAction }) {
    
    let ch = checked===undefined ? false : true;

    const toggleState = async(id) =>{
        setState(e => !e);
        try{
            await toggleSolved(id);
            toggleSolvedAction(id);
        } catch(err){
            alert(err.message);
        }
    };

    const [state, setState] = useState(ch);
    useEffect(() => {
        setState(ch);
    }, [ch]);

    
 
    return (
        <tr>
            <td className="col1">{question.index}</td>
            <td className="col2">
                <Link to ={`/problemset/problem/${question.index}`} style={{textDecoration: 'none',color:'#d6d6d6'} }>
                    {question.title}
                </Link>
            </td>
            {
                 user ?
                    <td 
                    className="col3" 
                    onClick={(e) => toggleState(question.id)} 
                    style={ state ? {background: 'rgba(14,173,105,0.39)'}: {}}>
                        {
                            state ? 'Yes' : 'No'
                        }
                      {/* <input className="form-check-input" type="checkbox" value="" id= {`${question.id}`} onChange={(e) => toggleState(question.id)} checked = {state} /> */}
                    </td>
                 :  
                 null
            } 
        </tr>
    )
}

const mapStateToProps = (state) =>({
    user : getUserSelector(state),
});

const mapDispatchToProps = (dispatch) =>({
    toggleSolvedAction: (id) => dispatch(toggleSolvedAction(id)),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Question));
