import { notification } from 'antd';

export const showErrorNotification = (message: string, description: string) => {
    notification.error({
        message,
        description,
    });
};