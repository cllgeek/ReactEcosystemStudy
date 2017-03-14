/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let lib = require('../../lib');
let toutiaoLib = require('./toutiaoLib');

function* toutiao() {
    //this.response.set("Content-Type", "application/json;charset=utf-8");

    let resBody = yield lib.parseBody('http://toutiao.io/').then((body) => {
        return body;
    });

    let postList = $(resBody).find('.posts');
    let curDate = $(resBody).find('.daily:first-child').find('.date').children('small').text();
    let lists = postList.first().children('.post');
    let toutiaoLists = toutiaoLib.parseList(lists);
    let arr = lib.listToArr(toutiaoLists);

    this.response.body = {
        postLists:arr,
        curDate: curDate
    };
}

function* toutiaoArticle() {
    //this.response.set("Content-Type", "application/json;charset=utf-8");

    let origin = this.request.get('x-custom-header');

    /**
     *  异步请求同步: Generator 和 Promise
     *  用 request 请求时,没法同步,但可以用 Promise封装了,见 requestPromise
     *  另外就是利用 co-request 看了源码后 也是用 Promise 进行 polyfill
     *  let result = yield coRequest(origin);
     url = result.client._httpMessage._headers.host + result.client._httpMessage.path;
     *  另一个点是 yield 后只能跟 promise/generator等 跟普通的Object会报错
     */
    // let result = yield coRequest(origin);
    // url = result.client._httpMessage._headers.host + result.client._httpMessage.path;
    let url = yield lib.parseUrl(origin).then((path) => {
        return path;
    });
    this.body = JSON.stringify({
        url: url
    });
}

function* toutiaotPrev () {
    //this.response.set("Content-Type", "application/json;charset=utf-8");

    let prevUrl = this.request.get('x-custom-header');

    let resBody = yield lib.parseBody(prevUrl).then((body) => {
        return body;
    },(err) => {
        console.log('reject',err);
        return 404;
    });
    
    let arr = [];
    let hasNext = 0;
    let curDate = '';

    if(resBody !== 404){
        let lists = $(resBody).find('.post');
        hasNext = 1;
        curDate = $(resBody).find('.date').children('small').text();
        let toutiaoPrevLists = toutiaoLib.parseList(lists);
        arr = lib.listToArr(toutiaoPrevLists);
    }
    
    this.response.body = {
        postLists:arr,
        hasNext: hasNext,
        curDate: curDate
    };
}

module.exports.register = (router) => {
    router.get('/toutiao', toutiao);
    router.get('/toutiao/article', toutiaoArticle);
    router.get('/toutiao/prev', toutiaotPrev)
};