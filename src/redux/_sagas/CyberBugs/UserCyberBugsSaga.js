import { fork, take, takeEvery, delay, takeLatest, call, put, select } from 'redux-saga/effects';
import Axios from 'axios';
import { ADD_USER_PROJECT_API, GET_LIST_PROJECT_SAGA, GET_USER_API, GET_USER_SEARCH, REMOVE_USER_PROJECT_API, SET_CURRENT_USER_INFO, USER_SIGNIN_API } from '../../types/CyberBugs/CyberBugsTypes';
import { cyberBugsService } from '../../../services/CyberBugsService';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../types/LoadingTypes';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { history } from '../../../util/history';
import { userService } from '../../../services/UserService';


//Quản lý các action saga

function* signInSaga(action) {

    //display loading

    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    //gọi API
    try {
        const { data, status } = yield call(() => {

            return cyberBugsService.signInCyberBugs(action.userLogin);
        });

        if (status === STATUS_CODE.SUCCESS) {

            //login success, save token in localStorage            
            //console.log(data);
            localStorage.setItem(TOKEN, data.content.accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));


            yield put({
                type: SET_CURRENT_USER_INFO,
                userLogin: data.content
            });

            //lấy history từ reducer về và chuyển hướng trang
            //let history = yield select(state => state.HistoryReducer.history);
            history.push('/home');
            //action.userLogin.history.push('/home');

        }

    } catch (error) {
        console.log(error.response.data);
    } finally {
        //remove loading
        yield put({
            type: HIDE_LOADING
        })
    }


}

export function* theoDoiSignIn() {
    yield takeLatest(USER_SIGNIN_API, signInSaga);
}

function* getUserSaga(action) {

    //display loading

    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    //gọi API
    try {
        const { data, status } = yield call(() => {

            return userService.getUser(action.keyWord);
        });

        //console.log(data);

        if (status === STATUS_CODE.SUCCESS) {


            //search thành công user => đưa lên reducer
            yield put({
                type: GET_USER_SEARCH,
                lstUserSearch: data.content
            });


            //lấy history từ reducer về và chuyển hướng trang
            //let history = yield select(state => state.HistoryReducer.history);
            //history.push('/home');
            //action.userLogin.history.push('/home');

        }

    } catch (error) {
        console.log(error.response.data);
    } finally {
        //remove loading
        yield put({
            type: HIDE_LOADING
        })
    }


}

export function* theoDoiGetUser() {
    yield takeLatest(GET_USER_API, getUserSaga);
}


function* addUserProjectSaga(action) {


    //console.log(action);

    //display loading

    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    //gọi API
    try {
        const { data, status } = yield call(() => {

            return userService.assignUserProject(action.userProject);
        });

        //console.log(data);

        if (status === STATUS_CODE.SUCCESS) {

            //console.log('add user project successfully!');
            //add user vào project thành công => get lại list project
            yield put({
                type: GET_LIST_PROJECT_SAGA,

            });


        }

    } catch (error) {
        console.log(error.response.data);
    } finally {
        //remove loading
        yield put({
            type: HIDE_LOADING
        })
    }


}

export function* theoDoiAddUserProject() {
    yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}



function* removeUserProjectSaga(action) {


    //console.log(action);

    //display loading

    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500);

    //gọi API
    try {
        const { data, status } = yield call(() => {

            return userService.deleteUserFromProject(action.userProject);
        });

        //console.log(data);

        if (status === STATUS_CODE.SUCCESS) {

            //console.log('add user project successfully!');
            //add user vào project thành công => get lại list project
            yield put({
                type: GET_LIST_PROJECT_SAGA,

            });


        }

    } catch (error) {
        console.log(error.response.data);
    } finally {
        //remove loading
        yield put({
            type: HIDE_LOADING
        })
    }


}

export function* theoDoiRemoveUserProject() {
    yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
}