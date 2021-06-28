/* eslint-disable eqeqeq */
import React from 'react'
import Question from '../../components/question/question';
import Page from '../../components/pagination/pagination';
import {problemset} from '../../redux/problemset/problemSetSelector';
import {getUserSelector} from '../../redux/user/userSelector';
import {connect} from 'react-redux';
import TagsComponent from '../tagsComponent/tagsComponent';

import './problemSetComponent.scss'

const ProblemSetComponent = ({ questionPerPage, paginate, page, problemset,user,topic}) => {
    return (
        <div className="d-flex justify-content-around flex-wrap">
            <div className = "problemset">
                <table>
                    <tr>
                        <th className="col1">#</th>
                        <th className="col2">Title</th>
                        { user ? <td className="col31">Solved?</td> : null } 
                    </tr>

                    {   
                        problemset?.map(e => {
                            let checked = user?.solved.find(el => el == e.id);
                            return <Question key={ e.id } question={ e } checked = {checked}/>
                        })
                    }

                </table>
                <div className="pagination">
                {
                    questionPerPage ? 
                        <div>
                            <Page items ={450/questionPerPage} paginate = {paginate} page = {page}/>
                        </div>
                    : 
                        null
                }
                </div>
            </div>
            <TagsComponent/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    problemset: problemset(state),
    user: getUserSelector(state)
});

export default connect(mapStateToProps)(ProblemSetComponent);