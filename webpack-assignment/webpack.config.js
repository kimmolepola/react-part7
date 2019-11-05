const path = require('path');
const webpack = require('webpack')

const config = (env, argv) => {

    const backend_url = argv.mode === 'production'
    ? 'https://tranquil-bayou-44537.herokuapp.com'
    : 'http://localhost:3003'

    return {
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
                  target: 'http://localhost:3003',
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
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.REACT_APP_BACKEND': JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config
       