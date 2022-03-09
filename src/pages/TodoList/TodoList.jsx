import React, { Component } from 'react';
import './TodoList.css';
import axios from 'axios';

class TodoList extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }


    getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })

        //success
        promise.then((result) => {
            //console.log(result);
            //set lại state của component
            this.setState({ taskList: result.data });
        })

        //fail
        promise.catch((err) => {
            console.log(err);
        })

    }

    renderTaskTodo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {

            return <li key={index}>
                <span>{item.taskName}</span>
                <span style={{ display: 'none' }} />
                <div className="buttons">
                    <button type="button" className="remove" data-index={0} data-status="todo" onClick={() => { this.delTask(item.taskName) }}>
                        <span><i className="fa fa-trash-alt" /></span>
                    </button>
                    <button type="button" className="complete" data-index={0} data-status="todo" onClick={() => { this.checkTask(item.taskName) }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    renderTaskTodoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {

            return <li key={index}>
                <span>{item.taskName}</span>
                {/* <span style={{ display: 'block' }}>3/1/2022 16:49:33</span> */}
                <div className="buttons">
                    <button type="button" className="remove" data-index={0} data-status="completed" onClick={() => { this.delTask(item.taskName) }}>
                        <span><i className="fa fa-trash-alt" /></span>
                    </button>
                    <button type="button" className="complete" data-index={0} data-status="completed" onClick={() => { this.rejectTask(item.taskName) }}>
                        <i className="fa fa-undo"></i>

                    </button>
                </div>
            </li>
        })
    }

    componentDidMount() {
        this.getTaskList();
    }

    handleChange = (e) => {

        let { name, value } = e.target;
        let regexString = /^[a-z A-Z]+$/;

        let newValues = { ...this.state.values };
        newValues = { ...newValues, [name]: value }

        let newErrors = { ...this.state.errors };

        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = 'Taskname is invalid!';
        } else {
            newErrors[name] = '';
        }



        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        });
    }

    addTask = (e) => {
        e.preventDefault();
        //console.log(this.state.values.taskName);
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {
                taskName: this.state.values.taskName
            }
        });

        //success 
        promise.then(result => {
            //console.log(result.data);
            //refresh lấy các task mới nhất về
            this.getTaskList();
        })
        //fail
        promise.catch(err => {
            //console.log(err.response)
            alert(err.response.data);
        })
    }

    delTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(result => {
            console.log(result.data)
            this.getTaskList();
        });

        promise.catch(err => alert(err.response.data));
    }

    checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(result => {
            console.log(result.data)
            this.getTaskList();
        });

        promise.catch(err => alert(err.response.data));
    }

    rejectTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(result => {
            console.log(result.data)
            this.getTaskList();
        });

        promise.catch(err => alert(err.response.data));
    }

    render() {
        return (
            <form onSubmit={this.addTask}>
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
                                    onChange={this.handleChange} />
                                <button id="addItem" onClick={(e) => {
                                    this.addTask(e);
                                }}>
                                    <i className="fa fa-plus" />
                                </button>
                                <div>
                                    <span className='text-danger'><i>{this.state.errors.taskName}</i></span>
                                </div>



                            </div>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">

                                    {this.renderTaskTodo()}

                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed" >

                                    {this.renderTaskTodoDone()}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        );
    }
}

export default TodoList;