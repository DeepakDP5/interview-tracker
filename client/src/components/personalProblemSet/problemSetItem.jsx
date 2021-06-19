/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {deleteList} from '../../api/index';
import {addAList} from '../../redux/user/userActions';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import ModalWrapper from '../../components/modal/modal';
import ConfirmRemoveCompoment from './../confirmRemoveForm/confirmRemoveCompoment';

const Modal = ModalWrapper(ConfirmRemoveCompoment);

function ProblemSetItem({el, func, addAList}) {

    const [deletelist, setdeletelist] = useState(false);
    const history = useHistory();
    
    const [modalShow,setModalShow] = useState(false);
    const hideModal = ()=>{
        setModalShow(false);
    }

    const handleDeleteEle = async () => {
        try {
            const res = await deleteList(el._id);
            setdeletelist(e => !e);
            addAList(res.data.problemsets);
            history.push('/list?name=Favorite');
        } catch (err) {
            alert(err.response.data.message);
        }
    }
    return (
        <div>
            <li className="list-group-item d-flex justify-content-between align-items-center" style = {{cursor: 'pointer'}} onClick={(f) => func(el.name)}>
                {el.name} 
                {
                    el.name === 'Favorite' ? null : <button type="button" className="close" aria-label="Close"><span aria-hidden="true" onClick={e => setModalShow(true)}>x</span></button>
                }   
                <Modal onHide={() => setModalShow(false)} show = {modalShow} handleDeleteEle = {handleDeleteEle} hideModal = {hideModal} />
            </li>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    addAList: (data) => dispatch(addAList(data)),
});

export default connect(null, mapDispatchToProps)(ProblemSetItem);