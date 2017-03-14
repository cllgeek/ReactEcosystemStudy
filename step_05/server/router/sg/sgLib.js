/**
 * Created by pomy on 5/4/16.
 */

'use strict';

let $ = require('cheerio');

exports.parseList = function (lists) {
    let origin = 'https://segmentfault.com';
    
    let sgLists = lists.map((index, list) => {
        let titleObj = $(list).find('.title a');
        let title = titleObj.text();
        let originUrl = origin + titleObj.attr('href');
        let metaAuthor = $(list).find('.author a:first-child').text();
        let metaTime = $(list).find('.author .split')[0].nextSibling.nodeValue;
        let avatarUrl = $(list).find('.author img').attr('src');
        let a = $(list).find('.author a')[1];
        let subjectUrl = origin + a.attribs.href;
        let subjectText = a.children[0].data;

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listMetaAuthor: metaAuthor,
            listTime: metaTime,
            listAvatarUrl: avatarUrl,
            listSubjectUrl: subjectUrl,
            listSubjectText: subjectText
        };
    });

    return sgLists;
}