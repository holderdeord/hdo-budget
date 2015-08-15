var path = require('path');
var fs = require('fs');

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
                include: path.join(__dirname, 'src/js'),
                loader: 'babel?stage=0&plugins[]=./src/js/utils/BabelRelayPlugin',
            },

            {
               test: /\.scss$/,
               include: path.join(__dirname, 'src/css'),
               loader: 'style!css!sass?sourceMap'
            },

            {
               test: /\.css$/,
               loader: 'style!css'
            }
        ]
    },

    plugins: [
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

module.exports = config;
