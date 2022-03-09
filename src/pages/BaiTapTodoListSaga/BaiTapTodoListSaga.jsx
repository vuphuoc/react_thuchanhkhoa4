import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../../redux/types/TodoListTypes';
import Pagination from '../../components/Common/Pagination/Pagination';

export default function BaiTapTodoListSaga(props) {

    const dispatch = useDispatch();
    const { taskList } = useSelector(state => state.TodoListReducer);

    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    })

    useEffect(() => {
        getTaskList();

        //componentWillUnmount
        return () => {

        }
    }, [])

    const handleChange = (e) => {
        let { name, value } = e.target;
        let regexString = /^[a-z A-Z]+$/;

        let newValues = { ...state.values };
        newValues = { ...newValues, [name]: value }

        let newErrors = { ...state.errors };

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = 'Taskname is invalid!';
        } else {
            newErrors[name] = '';
        }

        setState({
            ...state,
            values: newValues,
            errors: newErrors
        });

    }

    const addTask = (e) => {
        e.preventDefault();
        //console.log(state.values.taskName);
        dispatch({
            type: ADD_TASK_API,
            taskName: state.values.taskName
        })
    }

    const getTaskList = () => {
        //dispatch action saga
        dispatch({
            type: GET_TASKLIST_API,

        });
    }

    const renderTaskTodo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {

            return <li key={index}>
                <span>{item.taskName}</span>
                <span style={{ display: 'none' }} />
                <div className="buttons">
                    <button type="button" className="remove" data-index={0} data-status="todo" onClick={() => { delTask(item.taskName) }}>
                        <span><i className="fa fa-trash-alt" /></span>
                    </button>
                    <button type="button" className="complete" data-index={0} data-status="todo" onClick={() => { checkTask(item.taskName) }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    const renderTaskTodoDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {

            return <li key={index}>
                <span>{item.taskName}</span>
                {/* <span style={{ display: 'block' }}>3/1/2022 16:49:33</span> */}
                <div className="buttons">
                    <button type="button" className="remove" data-index={0} data-status="completed" onClick={() => { delTask(item.taskName) }}>
                        <span><i className="fa fa-trash-alt" /></span>
                    </button>
                    <button type="button" className="complete" data-index={0} data-status="completed" onClick={() => { rejectTask(item.taskName) }}>
                        <i className="fa fa-undo"></i>

                    </button>
                </div>
            </li>
        })
    }

    const delTask = (taskName) => {
        dispatch({
            type: DELETE_TASK_API,
            taskName
        })
    }

    const checkTask = (taskName) => {
        dispatch({
            type: CHECK_TASK_API,
            taskName
        })
    }

    const rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName
        })
    }




    return <form onSubmit={addTask}>
        {/* <button type='button' className='btn btn-success' onClick={() => {
            dispatch({
                type: 'getTaskAPIAction'
            })
        }}>Dispatch action saga getTaskAPI</button> */}
        {/* <Pagination currentPage='2' totalPage='5' /> */}

        <div className="card">
            <div className="card__header">
                <img src={require('./bg.png')} />
            </div>
            {/* <h2>hello!</h2> */}
            <div className="card__body">

                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" name='taskName' type="text" placeholder="Enter an activity..."
                            onChange={handleChange} />
                        <button id="addItem" onClick={(e) => {
                            addTask(e);
                        }}>
                            <i className="fa fa-plus" />
                        </button>
                        <div>
                            <span className='text-danger'><i>{state.errors.taskName}</i></span>
                        </div>



                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskTodo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed" >
                            {renderTaskTodoDone()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </form>;
}
