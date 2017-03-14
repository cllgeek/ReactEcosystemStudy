/**
 *
 * @authors cllgeek (geekjc123@gmail.com)
 * @date    2017-02-28 11:36:48
 * @version $Id$
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let lib = require('../../lib');
let geekLib = require('./geekLib');

function* geek () {
    let resBody = yield lib.parseBody('http://geek.csdn.net/').then((body) => {
        return body;
    });

    let lists = $(resBody).find('#geek_list').children('.geek_list');
    let geekLists = geekLib.parseList(lists);
    let arr = lib.listToArr(geekLists);

    this.response.body = {
        postLists:arr
    };
}

function* geekPrev() {
    let from = this.request.get('x-custom-header');
    let url = `http://geek.csdn.net/service/news/get_news_list?size=20&from=${from}`;

    let resBody = yield lib.parseBody(url).then((body) => {
        return JSON.parse(body);
    });

    let container = $('<div></div>');
    container.append(resBody.html);

    let lists = container.find('.geek_list');
    let geekPrevLists = geekLib.parseList(lists);
    let arr = lib.listToArr(geekPrevLists);

    container = null;

    this.response.body = {
        postLists:arr,
        hasNext: resBody.has_more,
        from: resBody.from
    };
}

module.exports.register = (router) => {
    router.get('/geek', geek);
    router.get('/geek/prev', geekPrev);
};