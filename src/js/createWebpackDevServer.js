import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export default function createWebpackDevServer(host, port) {
    const contentBase = `http://${host}:${port}`;
    const config = require('../../webpack.config.js');

    config.entry = [
        `webpack-dev-server/client?${contentBase}`,
        'webpack/hot/only-dev-server',
        ...config.entry
    ];

    config.plugins.unshift(new webpack.NoErrorsPlugin());
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

    config.module.loaders[0].loaders = ['react-hot', config.module.loaders[0].loader];
    delete config.module.loaders[0].loader;

    config.devtool = 'eval-source-map';
    config.output.publicPath = `${contentBase}${config.output.publicPath}`;

    console.log(JSON.stringify(config, null, 2));

    return new WebpackDevServer(webpack(config), {
        contentBase: contentBase,
        hot: true,
        inline: true,
        // lazy: false,
        // historyApiFallback: true,
        publicPath: config.output.publicPath,
        headers: {'Access-Control-Allow-Origin': '*'},
        stats: {colors: true}
    });
}
