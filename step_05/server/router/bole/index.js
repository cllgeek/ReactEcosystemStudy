/**
 *
 * @authors cllgeek (geekjc123@gmail.com)
 * @date    2017-02-28 11:26:48
 * @version $Id$
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let lib = require('../../lib');
let boleLib = require('./boleLib');

function* bole () {
    let resBody = yield lib.parseBody('http://top.jobbole.com/').then((body) => {
        return body;
    });

    let lists = $(resBody).find('.list-posts').children().not('.sponsored');
    let boleLists = boleLib.parseList(lists);
    let arr = lib.listToArr(boleLists);

    this.response.body = {
        postLists:arr
    };

    //avoid typeError: Converting circular structure to JSON
    //boleLists的输出如下,转化json时报上述的TypeError错误 因为形成了圈,无法解析,应该转化成数组
    // '0':
    //     { listTitle: 'Adobe 将升级视频剪辑软件Premiere，增加对VR的支持',
    //         listriginUrl: 'http://top.jobbole.com/34418/',
    //         listMeta: '11 小时前',
    //         listAvatarUrl: '/pomy.jpg',
    //         listSubjectUrl: '#',
    //         listSubjectText: '无' },
    //     '1':
    //     { listTitle: '万维网联盟正在Github上开发HTML5.1',
    //         listriginUrl: 'http://top.jobbole.com/34407/',
    //         listMeta: '16 小时前',
    //         listAvatarUrl: '/pomy.jpg',
    //         listSubjectUrl: '#',
    //         listSubjectText: '无' }
}

function*  bolePrev() {
    let prevUrl = this.request.get('x-custom-header');
    let resBody = yield lib.parseBody(prevUrl).then((body) => {
        return body;
    });

    let arr = [];
    let hasNext = 0;
    let posts = $(resBody).find('.list-posts');

    if(posts[0]) {
        hasNext = 1;
        let lists = posts.children().not('.sponsored');
        let boleLists = boleLib.parseList(lists);
        arr = lib.listToArr(boleLists);
    }


    this.response.body = {
        postLists:arr,
        hasNext: hasNext
    };
}

module.exports.register = (router) => {
    router.get('/bole', bole);
    router.get('/bole/prev', bolePrev);
};