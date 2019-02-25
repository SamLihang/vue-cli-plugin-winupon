import "whatwg-fetch";
import Axios from "axios";
const fetchTimeout = 30000;

let defaultHost;
let didTimeOut = false;
let protocol = window.location.protocol; //协议
let host = window.location.host; //主机+端口

if (process.env.NODE_ENV === "production") {
    defaultHost = protocol + "//" + host;
} else {
    defaultHost = "/api";
}

export let $fetch = (url, body, method = "get") => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(function() {
            didTimeOut = true;
            reject(new Error("Request timed out"));
        }, fetchTimeout);

        if (didTimeOut) {
            return;
        }

        let isSuccess = true;
        let path = defaultHost + url;
        if (method === "get") {
            path += "?";
            for (let i in body) {
                path += `${i}=${body[i]}&`;
            }
            //删除最后一个&
            let arr = path.split("");
            arr.pop();
            path = arr.join("");
        }

        fetch(path, {
            method,
            body: body && method === "post" ? JSON.stringify(body) : null
        })
            .then(res => {
                clearTimeout(timeout);
                if (!didTimeOut) {
                    isSuccess = res.ok;
                    return res.json();
                }
            })
            .then(response => {
                if (isSuccess) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch(error => {
                // console.log(error)
                reject(error);
            });
    });
};

export const $axios = (url, body, method="post") => {
    return Axios({
        url: defaultHost + url,
        method: method,
        data: body,
    });
};
