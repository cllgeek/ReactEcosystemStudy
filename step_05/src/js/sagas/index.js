// saga 模块化引入
import { fork } from 'redux-saga/effects'

// 异步逻辑
import { ttPosts } from './ttPosts'
import { gkPosts } from './gkPosts'
import { blPosts } from './blPosts'
import { sgPosts } from './sgPosts'
import { tcPosts } from './tcPosts'

// 单一进入点，一次启动所有 Saga
export default function* rootSaga() {
  yield [
    fork(ttPosts),
    fork(gkPosts),
    fork(blPosts),
    fork(sgPosts),
    fork(tcPosts)
  ]
}