import { applyMiddleware, combineReducers, createStore } from 'redux'
import TodoListReducer from './reducers/TodoListReducer';
import LoadingReducer from './reducers/LoadingReducer';
import { ModalReducer } from './reducers/ModalReducer';
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserCyberBugsReducer } from './reducers/UserCyberBugsReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectCyberBugsReducer } from './reducers/ProjectCyberBugsReducer';
import { DrawerCyberBugsReducer } from './reducers/DrawerCyberBugsReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';


//middleware redux thunk
import reduxThunk from 'redux-thunk';
//middleware redux saga
import createMiddleWareSaga from 'redux-saga';

import { rootSaga } from './_sagas/rootSaga';

const middlewareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    TodoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerCyberBugsReducer,
    ProjectReducer,
    TaskTypeReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middlewareSaga));

//gọi saga
middlewareSaga.run(rootSaga);

export default store;