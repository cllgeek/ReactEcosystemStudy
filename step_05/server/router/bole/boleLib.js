/**
 *
 * @authors cllgeek (geekjc123@gmail.com)
 * @date    2017-02-28 11:56:48
 * @version $Id$
 */

'use strict';

let $ = require('cheerio');

exports.parseList = function (lists) {
    let boleLists = lists.map((index, list) => {
        let titleObj = $(list).find('.p-tit a');
        let title = titleObj.text();
        let originUrl = titleObj.attr('href');
        let meta = $(list).find('.p-meta span:first-child').text();
        let avatarUrl = '/pomy.jpg';
        let subjectUrl = $(list).find('.p-tags a').length === 1 ? $(list).find('.p-tags a').attr('href') : '#';
        let subjectText = $(list).find('.p-tags a').length === 1 ? $(list).find('.p-tags a').text() : '无';

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listMeta: meta,
            listAvatarUrl: avatarUrl,
            listSubjectUrl: subjectUrl,
            listSubjectText: subjectText
        };
    });

    return boleLists;
}