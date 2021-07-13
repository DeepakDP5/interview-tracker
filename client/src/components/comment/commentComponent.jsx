import React from 'react';
import Comment from './comment';
import './comment.scss';

const EmptyComponent = ()=>(
    <p>No Comments yet.</p>
);

function CommentComponent({comments, user, idx}) {
    let cmt = [...comments];
    cmt.reverse();
    return (
        <div className = "comment-container">
            {   
                cmt.length > 0 ? 
                cmt.map((el,i)=>(
                    <Comment key = {i} comment = {el} user = {user} idx = {idx}/>
                )) : <EmptyComponent/>
            }
        </div>
    )
};

export default CommentComponent;
