/**
 *
 * @authors cllgeek (geekjc123@gmail.com)
 * @date    2017-02-28 11:56:50
 * @version $Id$
 */

'use strict';

var path = require('path');
var views = require('co-views');

module.exports = views(path.resolve(__dirname, '../public'),{
    map: {html: 'swig'}
});