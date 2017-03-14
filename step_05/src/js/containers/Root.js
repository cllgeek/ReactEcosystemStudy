import React from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router } from 'react-router'

import css from '../../styles/index.scss'
import 'antd-mobile/lib/flex/style/css'
import 'moment/locale/zh-cn'

import App from './index'

const Root = ({ store,history }) => (
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>
)

export default Root