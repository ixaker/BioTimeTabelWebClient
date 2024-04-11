export interface NotifyData {
    type: 'warning' | 'success';
    title: string;
    text: string;
}

interface MessageData {
    first_name: string;
    time: string;
    state: string;
    error: boolean;
    msg: string;
}


export const getMessageText = (data: MessageData): NotifyData => {
    if (data.error) {
        return {
            type: 'warning',
            title: `${data.state} - ${data.time}`,
            text: `${data.msg}`,
        };
    } else {
        return {
            type: 'success',
            title: `${data.state} - ${data.time}`,
            text: `${data.first_name}`,
        };
    }
}