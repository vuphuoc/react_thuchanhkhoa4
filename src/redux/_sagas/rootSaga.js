import { all } from 'redux-saga/effects';
import * as TodoListSaga from './TodoListSaga';
import * as Cyberbugs from './CyberBugs/UserCyberBugsSaga';
import * as ProjectCategorySaga from './CyberBugs/ProjectCategorySaga';
import * as ProjectSaga from './CyberBugs/ProjectSaga';
import * as TaskTypeSaga from './CyberBugs/TaskTypeSaga';

export function* rootSaga() {

    //CÁCH THƯỜNG
    //các fork bên dưới chạy bất đồng bộ nên sẽ thực thi đồng thời (non-blocking)
    // yield fork(getTaskAPI);
    // yield fork(getMentors);

    //CÁCH MỚI
    //sử dụng takeEvery (mỗi lần dispatch gọi 1 lần function)
    //yield takeEvery('getTaskAPIAction', getTaskAPI)

    //sử dụng takeLatest (dispatch nhiều lần nhưng chỉ lần dispatch cuối cùng mới gọi function)
    //yield takeLatest('getTaskAPIAction', getTaskAPI)

    yield all([

        //----nghiệp vụ theo dõi các action saga todolist
        //theo dõi các action saga todoList
        TodoListSaga.theoDoiActionGetTaskAPI(),
        //các action khác
        TodoListSaga.theoDoiActionAddTaskAPI(),
        TodoListSaga.theoDoiActionDeleteTaskAPI(),
        TodoListSaga.theoDoiActionCheckDoneTaskAPI(),
        TodoListSaga.theoDoiActionRejectDoneTaskAPI(),

        //nghiệp vụ theo dõi các action của CyberBugs..
        Cyberbugs.theoDoiSignIn(),
        Cyberbugs.theoDoiGetUser(),
        Cyberbugs.theoDoiAddUserProject(),
        Cyberbugs.theoDoiRemoveUserProject(),

        ProjectCategorySaga.theoDoiGetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProjectSaga(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetAllProjectSaga(),

        TaskTypeSaga.theoDoiGetAllTaskTypeSaga()

    ])
}