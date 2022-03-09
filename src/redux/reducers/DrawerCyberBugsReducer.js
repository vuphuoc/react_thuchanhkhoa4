import { OPEN_DRAWER, CLOSE_DRAWER, OPEN_FORM_EDIT_PROJECT, SET_SUBMIT_EDIT_PROJECT, OPEN_FORM_CREATE_TASK } from '../types/CyberBugs/DrawerCyberBugsTypes';

const stateDefault = {
    visible: false,
    title: 'Drawer title',
    ComponenContentDrawer: <p>default drawer content</p>,
    callBackSubmit: (propsValue) => {
        console.log('submit drawer demo');
    }
}

export const DrawerCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...state, visible: true };

        case CLOSE_DRAWER:
            return { ...state, visible: false };

        case OPEN_FORM_EDIT_PROJECT:
            return { ...state, visible: true, ComponenContentDrawer: action.Component, title: action.title };

        case SET_SUBMIT_EDIT_PROJECT:
            return { ...state, callBackSubmit: action.submitFunction };

        case OPEN_FORM_CREATE_TASK:
            return { ...state, visible: true, ComponenContentDrawer: action.Component, title: action.title };


        default: return { ...state };
    }
}

