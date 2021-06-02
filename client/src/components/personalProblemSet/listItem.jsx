import React from 'react';

export default function ListItem({el}) {
    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center pt-1 pb-1">
                <a href = {el.link} target = "_blank" rel="noreferrer" style = {{textDecoration:'none'}}>{el.title}</a>
            </li>
        </div>
    )
}
