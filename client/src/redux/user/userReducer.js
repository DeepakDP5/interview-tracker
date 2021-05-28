import types from "./types";

const helper =  (user,id) => {
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
            user : helper(state.user,action.payload)
        })

        default : return ({
            ...state
        })
    }
};
export default  userReducer;