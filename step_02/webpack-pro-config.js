var path=require('path');
var webpack=require('webpack');

var HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry:{
        index:'./src/index',
        vendor:[
          'react',
          'react-dom'
        ]
    },

    output:{
        path:path.join(__dirname,'dist'),
        publicPath:'',
        filename:'bundle.js'
    },

    plugins:[
       new webpack.optimize.OccurrenceOrderPlugin(),
       new webpack.optimize.UglifyJsPlugin({
         compressor:{
            warnings:false
         }
       }),

       new webpack.DefinePlugin({
         'process.env.NODE_ENV':JSON.stringify('production'),
         __DEV__:false
       }),

       new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),

       new HtmlWebpackPlugin({
         template:'src/index.ejs',
         title:'产品模式',
         filename:'index.html',
         favicon:'./src/favicon.ico',
         inject:'body',
         chunks:['vendor','index'],
         hash:true,
         minify:{
            removeComments:true,

            collapseWhitespace:true
         }
       })
    ],
    resolve:{
        extensions:['','.js','jsx']
    },

    module:{
        loaders:[
          {
            test:/\.js$/,
            loaders:['babel'],
            exclude:/node_modules/
          },
          {
            test:/\.scss$/,
            include:path.resolve(__dirname,'src/js'),
            loaders:[
              'style',
              'css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
              'postcss?parser=postcss-scss'
            ]
          },
          {
            test:/\.scss$/,
            include:path.resolve(__dirname,'src/styles'),
            loader:'style!css!postcss?parser=postcss-scss'
          },
          {
            test:/\.(otf|eot|svg|ttf|woff|woff2).*$/,
            loader:'url?limit=10000'
          },
          {
            test: /\.(gif|jpe?g|png|ico)$/,
            loader: 'url?limit=10000'
          }
        ]
    },
    postcss:function(){
        return [
          require('precss'),
          require('autoprefixer'),
          require('rucksack-css')
        ];
    }
};