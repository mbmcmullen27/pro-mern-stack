const path = require('path');

module.exports = {
    target: 'node',
    entry: './server/server.js',
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
