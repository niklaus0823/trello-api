import * as http from 'http';
import * as rest from 'restler';

const MIN_REQUEST_DELAY = 500;
const MAX_REQUEST_DELAY = 7000;

export const makeRequest = async function (fn: Function, uri: string, options: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        let completeCallback = (res: any, response: http.ServerResponse) => {
            // in case we hit HTTP 429, delay requests by random timeout in between minRequestDelay and maxRequestDelay
            // http://help.trello.com/article/838-api-rate-limits
            if (response && response.statusCode === 429) {
                setTimeout(() => {
                    fn(uri, options).once('complete', completeCallback);
                }, Math.floor(Math.random() * (MAX_REQUEST_DELAY - MIN_REQUEST_DELAY)) + MIN_REQUEST_DELAY);
            } else if (res instanceof Error) {
                reject(res);
            } else {
                resolve(res);
            }
        };

        fn(uri, options).once('complete', completeCallback);
    });
};

export const methods = {
    'post': rest.post,
    'get': rest.get,
    'put': rest.put,
    'delete': rest.del
};