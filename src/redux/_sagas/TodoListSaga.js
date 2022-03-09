import { fork, take, takeEvery, delay, takeLatest, call, put } from 'redux-saga/effects';
import Axios from 'axios';
import { GET_TASK_API, GET_TASKLIST_API, ADD_TASK_API, DELETE_TASK_API, CHECK_TASK_API, REJECT_TASK_API } from '../types/TodoListTypes';
import { DISPLAY_LOADING, HIDE_LOADING } from '../types/LoadingTypes';
import { toDoListService } from '../../services/TodoListService';
import { STATUS_CODE } from '../../util/constants/settingSystem';

/*redux có 2 loại action: 
  - trả về object (normal action) 
  - trả về function (phải sử dụng middleware để dispatch, thường dùng gọi API hoặc action khác)
*/

/*
    16/02/2022 Phước viết chức năng getTaskAPI
    action getTaskAPI lấy taskList từ API
*/
function* getTaskAPI(action) {

    //CÁCH THƯỜNG
    // yield take('getTaskAPIAction'); //theo dõi action -> xem action nào dispatch mới làm các việc bên dưới
    // console.log('getTaskAPI');

    // yield take('getTaskAPIAction'); //theo dõi action -> xem action nào dispatch mới làm các việc bên dưới
    // console.log('getTaskAPI lần 2');

    //để 1 yield chạy liên tục ta bỏ vào while()
    // while (true) {
    //     yield take('getTaskAPIAction'); //theo dõi action -> xem action nào dispatch mới làm các việc bên dưới
    //     console.log('getTaskAPI');
    //     //call API, dispatch reducer...
    // }


    //CÁCH MỚI
    //yield delay(3000); //delay sau 3s sẽ trả ra tất cả các lần dispatch (thường áp dụng cho việc tìm kiếm)
    //console.log('getTask API', action);

    //ko sử dụng service
    // let { data, status } = yield call(() => {
    //     return Axios({
    //         url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
    //         method: 'GET'
    //     })
    // });


    //trước khi lấy data hiển thị loading 
    //put: giống dispatch (parameter là 1 action)
    yield put({
        type: DISPLAY_LOADING
    })



    try {
        //sử dụng service
        let { data, status } = yield call(toDoListService.getTaskAPI);

        yield delay(500);

        //sau khi lấy giá trị thành công => dùng put (giống dispatch bên redux-thunk) đẩy data lên reducer
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API,
                taskList: data
            })

            //sau khi lấy data xong ấn loading
            yield put({
                type: HIDE_LOADING
            })
        } else {
            console.log('Something went wrong!');
            yield put({
                type: HIDE_LOADING
            })
        }

    } catch (error) {
        console.log(error)
    }


}

function* getMentors() {
    console.log('Mentor');
}

function* addTaskAPIAction(action) {
    //console.log(action);
    const { taskName } = action;

    //hiển thị loading
    // yield put({
    //     type: DISPLAY_LOADING
    // })

    try {
        //gọi API add new task
        const { data, status } = yield call(() => toDoListService.addTaskAPI(taskName));
        //yield delay(500);
        //success => ẩn loading, hiện task mới
        if (status === STATUS_CODE.SUCCESS) {

            //refresh taskList
            yield put({
                type: GET_TASKLIST_API
            })

        }

    } catch (error) {
        //fail => thông báo lỗi, ẩn loading
        console.log(error);
    } finally {
        //hide loading
        // yield put({
        //     type: HIDE_LOADING
        // })
    }

}

function* deleteTaskAPIAction(action) {
    const { taskName } = action;

    //hiển thị loading
    // yield put({
    //     type: DISPLAY_LOADING
    // })

    try {
        const { data, status } = yield call(() => toDoListService.deleteTaskAPI(taskName));
        //yield delay(500);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch (error) {
        console.log(error);
    } finally {
        // yield put({
        //     type: HIDE_LOADING,
        // })
    }

}


function* checkDoneTaskAPIAction(action) {
    const { taskName } = action;

    //hiển thị loading
    // yield put({
    //     type: DISPLAY_LOADING
    // })

    try {
        const { data, status } = yield call(() => toDoListService.checkDoneTaskAPI(taskName));
        //yield delay(500);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch (error) {
        console.log(error);
    } finally {
        // yield put({
        //     type: HIDE_LOADING,
        // })
    }

}

function* rejectDoneTaskAPIAction(action) {
    const { taskName } = action;

    //hiển thị loading
    // yield put({
    //     type: DISPLAY_LOADING
    // })

    try {
        const { data, status } = yield call(() => toDoListService.rejectDoneTaskAPI(taskName));
        //yield delay(500);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch (error) {
        console.log(error);
    } finally {
        // yield put({
        //     type: HIDE_LOADING,
        // })
    }

}

export function* theoDoiActionGetTaskAPI() {
    yield takeLatest(GET_TASKLIST_API, getTaskAPI);
}

export function* theoDoiActionAddTaskAPI() {
    yield takeLatest(ADD_TASK_API, addTaskAPIAction);
}

export function* theoDoiActionDeleteTaskAPI() {

    //khi component dispatch lên 1 action có type = DELETE_TASK_API thì
    //yield sẽ gọi deleteTaskAPIAction
    yield takeLatest(DELETE_TASK_API, deleteTaskAPIAction);
}

export function* theoDoiActionCheckDoneTaskAPI() {
    yield takeLatest(CHECK_TASK_API, checkDoneTaskAPIAction);
}

export function* theoDoiActionRejectDoneTaskAPI() {
    yield takeLatest(REJECT_TASK_API, rejectDoneTaskAPIAction);
}