import http from "./HttpService";

const secondApiURL = process.env.localServer;

export const createChannel = (isGroup, payload) => {
    const url = (isGroup === false) ? '/api/v1/channel/channel' : '/api/v1/channel/group-channel'

    return http.post(secondApiURL + url, payload);
}

export const getChannels = (isGroup, id, acc_id) => {
    const url = isGroup ? ('/api/v1/channel/channel?userId=' + id + '&isGroup=' + isGroup + '&accountId=' + acc_id) : ('/api/v1/channel/channel?userId=' + id)
    return http.get(secondApiURL + url);
}