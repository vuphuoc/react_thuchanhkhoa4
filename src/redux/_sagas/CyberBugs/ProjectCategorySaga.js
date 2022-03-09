import { call, put, takeLatest, delay } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../types/CyberBugs/CyberBugsTypes';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../types/LoadingTypes';

function* getAllProjectCategorySaga(action) {

    try {
        const { data, status } = yield call(() => cyberBugsService.getAllProjectCategory());

        yield put({
            type: DISPLAY_LOADING
        });

        yield delay(500);

        //sau khi có dữ liệu từ API, tiếp tục dispatch lên ProjectCategoryReducer qua yield put và cập nhật lại state
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
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

export function* theoDoiGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
}