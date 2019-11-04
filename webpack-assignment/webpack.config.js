const path = require('path');
const webpack = require('webpack');

const config = {

        entry: ['@babel/polyfill', '../bloglist/bloglist_frontend/src/index.js'],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js',
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
            proxy: {
                '/api/': {
                  target: 'https://tranquil-bayou-44537.herokuapp.com:3003',
                  changeOrigin : true,
                }
            }
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }, 
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                }
            ]
        }
    }

module.exports = config
       