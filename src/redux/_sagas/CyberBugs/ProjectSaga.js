import { call, put, takeLatest, delay } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PROJECT_DETAIL, PUT_PROJECT_DETAIL, UPDATE_PROJECT_SAGA } from '../../types/CyberBugs/CyberBugsTypes';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../types/LoadingTypes';
import { history } from '../../../util/history';
import { CLOSE_DRAWER } from "../../types/CyberBugs/DrawerCyberBugsTypes";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/NotificationCyberBugs";
import { ERROR, SUCCESS } from '../../types/CyberBugs/NotificationTypes';

function* createProjectSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() => cyberBugsService.createProjectAuthorize(action.newProject));

        //sau khi tạo project thành công
        if (status === STATUS_CODE.SUCCESS) {
            console.log('create project successfully!');
            history.push('/projectmanagement');
        }

    } catch (error) {
        console.log(error.response.data);
    } finally {
        yield put({
            type: HIDE_LOADING
        });

    }


}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}


//Saga dùng để get all project từ API
//Phước - Code ngày 01/03/2022

function* getListProjectSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() => cyberBugsService.getAllProject());


        //sau khi tạo project thành công,
        //cập nhật list project vào reducer
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content
            })
        }

    } catch (error) {
        console.log(error.response.data);
    } finally {
        yield put({
            type: HIDE_LOADING
        });
    }
}

export function* theoDoiGetListProjectSaga() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

function* updateProjectSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() => cyberBugsService.updateProject(action.projectUpdate));

        //sau khi update project thành công
        //cập nhật lại list project
        //tắt drawer (modal)
        if (status === STATUS_CODE.SUCCESS) {
            console.log('update project successfully!');
            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

            yield put({
                type: CLOSE_DRAWER
            })
        }

    } catch (error) {
        console.log(error.response.data);
    } finally {
        yield put({
            type: HIDE_LOADING
        });
    }
}

export function* theoDoiUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

function* deleteProjectSaga(action) {


    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() => projectService.deleteProject(action.id));

        //sau khi update project thành công
        //cập nhật lại list project
        //tắt drawer (modal)
        if (status === STATUS_CODE.SUCCESS) {

            notifiFunction(SUCCESS, `Delete project ${action.id} successfully!`)

            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

            yield put({
                type: CLOSE_DRAWER
            })
        } else {
            notifiFunction(ERROR, `Delete project failed!`, data);
        }

    } catch (error) {
        //console.log(error.response.data);
        notifiFunction(ERROR, `Delete project failed!`);
    } finally {
        yield put({
            type: HIDE_LOADING
        });
    }
}

export function* theoDoiDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

function* getProjectDetailSaga(action) {


    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
        console.log(action.projectId);
        //sau khi update project thành công
        //cập nhật lại list project
        //tắt drawer (modal)
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: PUT_PROJECT_DETAIL,
                projectDetail: data.content
            })

        } else {
            notifiFunction(ERROR, `Get project detail failed!`, data);
        }

    } catch (error) {
        //console.log(error.response.data);
        notifiFunction(ERROR, `Get project detail failed!`);
        history.push('/projectmanagement');
    } finally {
        yield put({
            type: HIDE_LOADING
        });
    }
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest(GET_PROJECT_DETAIL, getProjectDetailSaga);
}


function* getAllProjectSaga(action) {


    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() => projectService.getAllProject());

        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_PROJECT,
                arrProject: data.content
            })

        } else {
            notifiFunction(ERROR, `Get all project failed!`, data);
        }

    } catch (error) {
        //console.log(error.response.data);
        notifiFunction(ERROR, `Get all project failed!`);
        history.push('/projectmanagement');
    } finally {
        yield put({
            type: HIDE_LOADING
        });
    }
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
