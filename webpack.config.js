const path = require('path');

module.exports = {
    entry: {
        app:'./src/App.jsx',
    },
    output:{
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'static'),
    },
    optimization: {
        splitChunks: {
          name: 'vendor',
          chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                  }
                }         
            }
        ]
    }
}