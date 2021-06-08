/* eslint-disable eqeqeq */
import types from "./types";

const toggleSolvedStatus =  (user,id) => {
    let solved = user.solved;   
    if(!solved.length){
        return user;
    }else{
        let index = solved.find(e => e == id);
        if(!index){
            solved.push(id);
        }else{
            solved = solved.filter(e => e != id);
        }
    }
    user.solved = solved;
    return user;
};

const addProblem = (user, {data, id}) => {
    let problemsets = user.problemsets;
    let playlist = problemsets.find(el => el._id == id);
    playlist.list.push(data);
    user.problemsets = problemsets;
    return user;
};

const updateProfilePhoto = (user, data) => {
    user.photo = data;
    return user;
};

const addAList = (user,problemsets) =>{
    user.problemsets = problemsets;
    return user;
}

const INITIAL_STATE = {
    user: null,
    isLoading: false,
    error: undefined
};

const userReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case types.FETCHING_START : return({
            ...state,
            isLoading: true
        })
        case types.FETCH_SUCCESS: return({
            error: undefined,
            user: action.payload,
            isLoading: false
        })
        case types.FETCH_FAIL : return({
            ...state,
            isLoading: false,
            user: null,
            error: action.payload
        })
        case types.TOGGLE_SOLVED : return({
            ...state,
            user: toggleSolvedStatus(state.user, action.payload)
        })

        case types.UPDATE_PHOTO : return({
            ...state,
            user: updateProfilePhoto(state.user, action.payload)
        })

        case types.ADD_PROBLEM : return({
            ...state,
            user: addProblem(state.user, action.payload)
        })
        case types.ADD_A_LIST : return({
            ...state,
            user : addAList(state.user,action.payload)
        })

        default : return ({
            ...state
        })
    }
};
export default  userReducer;