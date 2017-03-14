/**
 *
 * @authors cllgeek (geekjc123@gmail.com)
 * @date    2017-02-28 11:56:12
 * @version $Id$
 */

//设置通用的响应头
function* common(next) {
    this.response.set("Content-Type", "application/json;charset=utf-8");
    //max-age:以秒为单位
    if(!(/prev/.test(this.request.path))){
        this.response.set("Cache-Control", "max-age=1800")
    }
    yield next;
}

module.exports.register = (router) => {
    router.get('*', common);
};