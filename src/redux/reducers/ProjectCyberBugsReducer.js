import { GET_ALL_PROJECT, GET_LIST_PROJECT } from "../types/CyberBugs/CyberBugsTypes";

const stateDefault = {
    projectList: [

    ],
    arrProject: [], //get all projects cho dropdown
}

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case GET_LIST_PROJECT: {
            return { ...state, projectList: action.projectList };
        }


        case GET_ALL_PROJECT: {
            return { ...state, arrProject: action.arrProject };
        }

        default: return { ...state }
    }
}