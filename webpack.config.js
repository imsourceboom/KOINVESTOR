var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var ManifestPlugin = require('webpack-manifest-plugin');


module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        vendor: [
            'moment',
            'flatpickr', 
            'typed.js', 
            'swiper', 
            'sticky-js', 
            'scrollreveal', 
            'waypoints/lib/noframework.waypoints.min.js',
            // 'normalize.css',
            // 'bootstrap/dist/css/bootstrap.min.css',
            // 'animate.css/animate.min.css',
            // 'flatpickr/dist/flatpickr.min.css',
            // 'swiper/dist/css/swiper.min.css'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: 'dist'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        compress: true,
        publicPath: '/dist/',
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: ['/node_modules'],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                    targets: {
                                        node: 'current'
                                    },
                                    modules: 'false'
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ManifestPlugin({
            fileName: 'assets.json',
            basePath: '/'
        }),
    ]
}