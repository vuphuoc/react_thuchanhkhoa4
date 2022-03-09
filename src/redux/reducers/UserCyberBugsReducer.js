import { USER_LOGIN } from "../../util/constants/settingSystem"
import { GET_USER_SEARCH, SET_CURRENT_USER_INFO } from "../types/CyberBugs/CyberBugsTypes";

let userLogin = {
}

if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin,
    userSearch: []
}

export const UserCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case SET_CURRENT_USER_INFO: {

            state.userLogin = action.userLogin
            return { ...state };
        }

        case GET_USER_SEARCH: {
            state.userSearch = action.lstUserSearch;

            return { ...state };
        }

        default: return { ...state };
    }
}