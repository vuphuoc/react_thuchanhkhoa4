//Tương tác với API

import Axios from 'axios';
import { DOMAIN } from '../util/constants/settingSystem';

export class TodoListService {
    constructor() {

    }

    getTaskAPI = () => {
        return Axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }

    addTaskAPI = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/AddTask`,
            method: 'POST',
            data: { taskName }
        })
    }

    deleteTaskAPI = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE',

        })
    }

    checkDoneTaskAPI = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT',

        })
    }

    rejectDoneTaskAPI = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT',

        })
    }
}

export const toDoListService = new TodoListService();

