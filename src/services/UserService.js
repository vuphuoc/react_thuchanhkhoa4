import { BaseService } from './BaseService';

export class UserService extends BaseService {

    constructor(props) {
        super();
    }

    getUser = (keyWord) => {
        return this.get(`/Users/getUser?keyword=${keyWord}`);
    }

    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject);
    }

    deleteUserFromProject = (userProject) => {
        return this.post('/Project/removeUserFromProject', userProject);
    }


}

export const userService = new UserService();