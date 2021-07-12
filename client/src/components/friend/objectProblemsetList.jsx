import React from 'react';

export default function ObjectProblemsetList({list,index,func}) {  

    const handleClick = ()=> {
        func(list.name)
    } 
    return (
        <tr>
            <td className = "list-index">{index}</td>
            <td className = "list-name" onClick = {handleClick}>{list.name}</td>
        </tr>
    )
}
