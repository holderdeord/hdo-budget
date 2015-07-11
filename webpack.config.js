var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var config = {
    entry: [path.join(__dirname, 'src/js/main.js')],

    output: {
        path: path.join(__dirname, '/public/js'),
        fileName: 'bundle.js',
        publicPath: '/js/'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel?optional[]=runtime&stage=0'
            },

            {
               test: /\.scss$/,
               loader: 'style!css!sass?sourceMap'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        function() {
            this.plugin('done', function(stats) {
                fs.writeFile(path.resolve(__dirname, 'webpack.hash'), stats.hash);
            });
        }
    ],

    resolve: {
      extensions: ['', '.js', '.jsx']
    },
};

if (process.env.NODE_ENV !== 'production') {
    config.entry = [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
    ].concat(config.entry);

    config.devServer = {
        contentBase: path.resolve(__dirname, './public'),
        hot: true,
        inline: true,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };

    config.devtool = 'eval-source-map';
}

console.log(config);

module.exports = config;
