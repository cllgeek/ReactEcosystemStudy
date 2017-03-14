/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let router = require('koa-router')();

require('./common/index').register(router);
require('./bole/index').register(router);
require('./geek/index').register(router);
require('./sg/index').register(router);
require('./toutiao/index').register(router);
require('./tc/index').register(router);
require('./render-index/index').register(router);

module.exports.register = (app) => {
    app.use(router.middleware());
};