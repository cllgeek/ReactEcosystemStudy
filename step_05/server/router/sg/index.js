/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let lib = require('../../lib');
let sgLib = require('./sgLib');

function* sg () {
    let resBody = yield lib.parseBody('https://segmentfault.com/blogs').then((body) => {
        return body;
    });

    let lists = $(resBody).find('.stream-list').children();
    let sgLists = sgLib.parseList(lists);
    let arr = lib.listToArr(sgLists);

    this.response.body = {
        postLists:arr
    };
}

function*  sgPrev() {
    let prevUrl = this.request.get('x-custom-header');
    let resBody = yield lib.parseBody(prevUrl).then((body) => {
        return body;
    });

    let arr = [];
    let hasNext = 0;
    let lists = $(resBody).find('.stream-list').children();

    if (lists.length > 0) {
        hasNext = 1;
        let boleLists = sgLib.parseList(lists);
        arr = lib.listToArr(boleLists);
    }


    this.response.body = {
        postLists: arr,
        hasNext  : hasNext
    };
}

module.exports.register = (router) => {
    router.get('/sg', sg);
    router.get('/sg/prev', sgPrev);
};