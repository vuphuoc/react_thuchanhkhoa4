import axios from 'axios';
import { DOMAIN_CYBERBUGS, TOKEN } from '../util/constants/settingSystem';

export class BaseService {

    //put JSON về phía BE
    put = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }

    post = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'POST',
            data: model,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }

    get = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }


    delete = (url, model) => {
        return axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }
}