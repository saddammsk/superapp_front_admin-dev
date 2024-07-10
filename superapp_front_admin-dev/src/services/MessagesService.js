import http from "./HttpService";

const secondApiURL = process.env.localServer;

export const getMessages = (id) => {
    return http.get(secondApiURL + '/api/v1/message/message?channelId=' + id);
}