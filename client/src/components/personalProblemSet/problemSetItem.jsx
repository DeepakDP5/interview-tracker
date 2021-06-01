import React from 'react';



export default function ProblemSetItem({el, func}) {
    

    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center" onClick={(f) => func(el.name)}>
                {el.name}
            </li>
        </div>
    )
}
