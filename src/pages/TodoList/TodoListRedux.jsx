import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { GET_TASK_API } from '../../redux/types/TodoListTypes';
import { addTaskAPI, checkTaskAPI, deleteTask, getTaskListAPI, rejectTaskAPI } from '../../redux/actions/TodoListActions';


export default function TodoListRedux(props) {

  const { taskList } = useSelector(state => state.TodoListReducer);
  const dispatch = useDispatch();

  let [state, setState] = useState({

    values: {
      taskName: ''
    },
    errors: {
      taskName: ''
    }
  })

  useEffect(() => {
    getTaskList();
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

    //xử lý nhận dữ liệu từ người dùng => gọi action addTaskAPI()
    dispatch(addTaskAPI(state.values.taskName));
  }

  const getTaskList = () => {
    dispatch(getTaskListAPI());
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
    dispatch(deleteTask(taskName));
  }

  const checkTask = (taskName) => {
    dispatch(checkTaskAPI(taskName));
  }

  const rejectTask = (taskName) => {
    dispatch(rejectTaskAPI(taskName));
  }




  return <form onSubmit={addTask}>
    {/* <button onClick={() => this.getTaskList()}>Get tasks</button> */}
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

