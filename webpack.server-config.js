const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: ['./server/index.js', './node_modules/webpack/hot/poll?1000'],
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: [/^[a-z]/],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
}
