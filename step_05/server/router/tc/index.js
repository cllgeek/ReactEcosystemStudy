/**
 * Created by pomy on 6/5/16.
 */

'use strict';

let $ = require('cheerio');

let lib = require('../../lib');
let tcLib = require('./tcLib');

function* tc () {
    let resBody = yield lib.parseBody('http://www.tuicool.com/ah/20?lang=0').then((body) => {
        return body;
    });

    let lists = $(resBody).find('.list_article').children();
    let tcLists = tcLib.parseList(lists);
    let arr = lib.listToArr(tcLists);

    this.response.body = {
        postLists:arr
    };
}

function*  tcPrev() {
    let prevUrl = this.request.get('x-custom-header');
    let resBody = yield lib.parseBody(prevUrl).then((body) => {
        return body;
    });

    let arr = [];
    let hasNext = 0;
    let lists = $(resBody).find('.list_article').children();

    if (lists.length > 0) {
        hasNext = 1;
        let tcLists = tcLib.parseList(lists);
        arr = lib.listToArr(tcLists);
    }


    this.response.body = {
        postLists: arr,
        hasNext  : hasNext
    };
}

module.exports.register = (router) => {
    router.get('/tc', tc);
    router.get('/tc/prev', tcPrev);
};