/**
 *
 * @authors cllgeek (geekjc123@gmail.com)
 * @date    2017-02-28 11:56:47
 * @version $Id$
 */

'use strict';

let compress = require('koa-compress');
let logger = require('koa-logger');
let serve = require('koa-static');
let koa = require('koa');
let koaJson = require('koa-json');
let cors=require('koa-cors');
let bodyParser = require('koa-bodyparser');
//var router = require('koa-router')();

let webpack=require('webpack')
let config=require('../webpack-dev-config')

import historyApiFallback from 'connect-history-api-fallback'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext,match } from 'react-router'
import { Provider } from 'react-redux'
import routes from '../src/js/routes'
import configureStore from '../src/js/store/configureStore'
import fetchPostsApi from '../src/js/sagas/ttPosts'

let path = require('path');

let lib = require('./lib');
let routerRegister = require('./router/index');

let app = koa();


if(process.env.NODE_ENV !== 'production'){
  let compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
  // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: false,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
      }
}));
app.use(historyApiFallback())
app.use(require('webpack-hot-middleware')(compiler));
}

app.use(bodyParser());
app.use(koaJson());
app.use(cors());
// Serve static files
// app.use(serve(path.resolve(__dirname, '../publick')));
// Compress
app.use(compress());
// Logger
app.use(logger());
//router
routerRegister.register(app);
//router.routes()
//app.use(router.middleware());

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html><html lang="en"><head><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta charset="utf-8"><meta name="Cache-Control" content="private"><script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script><title>开发模式</title><link rel="shortcut icon" href="/favicon.ico"></head><body><script id="__bs_script__">//<![CDATA[
    document.write("<script async src='/browser-sync/browser-sync-client.js?v=2.18.2'><\/script>".replace("HOST", location.hostname));
    //]]></script>
    <div id="app">${html}</div>
    <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    script type="text/javascript" src="vendor.js"></script>
    <script type="text/javascript" src="/bundle.js"></script></body></html>
  `;
}

function fetchPost(callback){
    callback(fetchPostsApi)
}

app.use((req, res) => {


  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      fetchPost((posts)=>{
        const initialState={
          isFetching:true,
          title:'开发者头条',
          items:posts
        }
        const store = configureStore(initialState)
        const html = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        res.end(renderFullPage(html, store.getState()))
      });
    } else {
      res.status(404).end('Not found');
    }
  });
});

app.listen('9001','127.0.0.1',  () => {
    console.log(process.env.NODE_ENV,'listening on port 9001`...');
});
