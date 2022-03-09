import axios from 'axios';
import { GET_TASK_API } from '../types/TodoListTypes';


export const getTaskListAPI = () => {

    //tiền xử lý dữ liệu => xử lý function
    return async dispatch => {

        //CÁCH VIẾT ASYNC AWAIT
        try {

            let { data, status } = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            })

            //console.log(data);

            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                })
            }

        } catch (error) {
            console.log(error.response.data);
        }


        //CÁCH VIẾT PROMISE
        // let promise = axios({
        //     url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
        //     method: 'GET'
        // })

        // //success
        // promise.then((result) => {
        //     //console.log(result);
        //     //set lại taskList trên Reducer
        //     dispatch({
        //         type: GET_TASK_API,
        //         taskList: result.data
        //     });
        // })

        // //fail
        // promise.catch(err => {
        //     //console.log(err.response)
        //     alert(err.response.data);
        // })

    }

}


export const addTaskAPI = (taskName) => {
    return async dispatch => {

        //xử lý trước khi dispatch
        try {
            let { data, status } = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: {
                    taskName: taskName
                }
            });

            if (status === 200) {
                dispatch(getTaskListAPI());
            }

        } catch (error) {
            console.log(error.response.data)
        }

    }
}


export const deleteTask = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });

        promise.then(result => {
            console.log(result.data)
            //refresh lại state để cập nhật các task mới
            dispatch(getTaskListAPI());
        });

        promise.catch(err => alert(err.response.data));
    }
}

export const checkTaskAPI = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(result => {
            console.log(result.data)
            dispatch(getTaskListAPI());
        });

        promise.catch(err => alert(err.response.data));
    }
}

export const rejectTaskAPI = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });

        promise.then(result => {
            console.log(result.data)
            dispatch(getTaskListAPI());
        });

        promise.catch(err => alert(err.response.data));
    }
}


