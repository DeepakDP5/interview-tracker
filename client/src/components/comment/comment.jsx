import React from 'react';
import {deleteComment} from '../../api/index';
import {fetchQuestion} from '../../redux/question/questionAction.js';
import {connect} from 'react-redux';

import './comment.scss';

function Comment({comment, user, fetchQuestion, idx}) {

    const onDeleteComment = async() => {
        try {
            await deleteComment(comment._id);
            fetchQuestion(idx);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const timeDelta = () => {
        const timeNow = 1*Date.now();
        let timeDelta = timeNow - (comment?.date);
        // console.log(`timeNow: ${timeNow}    timeDB:${comment?.date}    timeDelta:${timeDelta}`);
        timeDelta = Math.floor(timeDelta/1000);
        let timeStr = ''
        if (timeDelta < 24*60*60) {
            let h = Math.floor(timeDelta/3600);
            let m = (Math.floor(timeDelta/60))%60;
            let s = timeDelta%60;
            if (h>0) timeStr = `${h}h`;
            else if (m>0) timeStr = `${m}m`;
            else timeStr = `${s}s`;
        } else {
            let d = Math.floor(timeDelta/(24*60*60));
            timeStr = `${d}d`;
        }
        return timeStr;
    }

    return (

        <div className = "comment-wrapper">
            <div className = "comment-header">
                <div className = "image">
                    <img className = "user-image" src={`http://localhost:4000/images/user/${comment?.user.photo}`} alt = ''></img>
                </div>
                <div className = "username">
                    <p className = "name">{comment?.user.username}</p>
                </div>
                <div className = "time">
                    <p className = "comment-date">{timeDelta()}</p>
                </div>
            </div>

            <div className = "comment-body">
                <p className = "comment-text">{comment?.text}</p>
            </div>

            
                {
                    user?._id === comment?.user?._id ?
                        <div className = "remove-button-container">
                            <button className="remove-btn" onClick={onDeleteComment}>Remove</button>
                        </div>
                    :
                        null
                }
           
        </div>

        // <div className="card p-3">
        //     <div className="d-flex justify-content-between align-items-start">
        //         <div className="user d-flex flex-row align-items-start"> 
        //             <img src={`http://localhost:4000/images/user/${comment?.user.photo}`} width="30" className="user-img rounded-circle mr-2" alt = '' /> 
        //             <span>
        //                 <small className="font-weight-bold text-primary">{comment?.user.username}</small>
        //                 <br/>
        //                 <small className="font-weight-bold">{comment?.text}</small>
        //             </span> 
        //         </div> 
        //         <small className = "date">{comment?.date}</small>
        //         {
        //             user?._id === comment?.user?._id ?
        //                 <button type="button" className="close" aria-label="Close"><span aria-hidden="true" style = {{cursor: 'pointer'}} onClick={onDeleteComment}>x</span></button>
        //             :
        //                 null
        //         }
        //     </div>
        // </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchQuestion: (id) => dispatch(fetchQuestion(id)),
});

export default connect(null, mapDispatchToProps)(Comment);