import { notification } from "antd";

export const notifiFunction = (type, message, description = '') => {
    notification[type]({ //type = success, warning, info, error
        message: message,
        description: description,
    })
}