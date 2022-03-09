import { USER_SIGNIN_API } from "../types/CyberBugs/CyberBugsTypes";

//Quản lý các normal action cho CyberBugs

export const signInCyberBugsAction = (email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email,
            password
        }
    }
}