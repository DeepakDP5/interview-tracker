import React from 'react';
import {connect} from 'react-redux';
// import {getUserSelector} from '../../redux/user/userSelector';
import {useLocation,useHistory} from 'react-router-dom';
import queryString from 'query-string';
import ProblemSetListComponent from './problemSetListComponent';
import ProblemSetItem from './problemSetItem';

import './list.scss';


function PersonalProblemSetComponent({user}) {

    const loc  = useLocation();
    const history = useHistory();
    const val = queryString.parse(loc.search);
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
                    // {/* <h3 key = {e._id} onClick={(f) => func(e.name)}>{e.name} </h3> */}
                ))
                :
                null
            }
            </ol>
            <div className = "list">
            {
                user ?
                <ProblemSetListComponent playlist={playlist}/> : null
            }
            </div>

        </div>
    )
};

const mapStateToProps = (state) =>({
    user: state.user.user,
});

export default connect(mapStateToProps)(PersonalProblemSetComponent);
