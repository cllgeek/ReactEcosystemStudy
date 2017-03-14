/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let render = require('../../render');

function* index () {
    this.response.body = yield render('index');
}

module.exports.register = function (router) {
    router.get('/', index);
    router.get('/index', index);
};