/**
 *
 * @authors cllgeek (geekjc123@gmail.com)
 * @date    2017-02-28 11:56:48
 * @version $Id$
 */

'use strict';

let request = require('request');

exports.parseUrl = function (url) {
    return new Promise(function (resolve, reject) {
        let req = request.get(url);
        let urlPath = '';

        req.on('error', (err) => {
           reject(err);
        });
        req.on('response', (res) => {
            if(res.statusCode === 200) {
                urlPath = res.client._httpMessage._headers.host + res.client._httpMessage.path;
                resolve(urlPath);
            }
        });
    });
};

exports.parseBody = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, (error, res, body) => {
           if(!error && res.statusCode === 200) {
               resolve(body);
           } else {
               reject(error);
           }
        });
    });
};

exports.listToArr = function (lists) {
    let len = lists.length;
    let arr = [];

    for (let i = 0; i < len; i++) {
        arr.push(lists[i]);
    }

    return arr;
};