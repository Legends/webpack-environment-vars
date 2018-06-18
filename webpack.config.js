const {
    join
} = require("path")
const path = require("path")

// PLUGINS
const webpack = require("webpack"); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const distfolder = join(__dirname, "/dist/");

module.exports = (env) => {

    var theme = "";

    if (env.theme) {
        theme = "./src/css/" + env.theme + ".css"
    }
    console.log(path.resolve(theme));

    return {
        entry: './src/index.js',
        output: {
            path: distfolder,
            filename: 'bundle.js'
        },
        resolve: {
            alias: {
                "theme$": path.resolve(theme)
            }
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }
            }, {
                test: /\.css$/,
                use: [
                    //filename: "bundle.css",
                    //allChunks: true,
                    //fallback: "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                'theme': JSON.stringify(env.theme)
            }),
            // new BundleAnalyzerPlugin({
            //     analyzerMode: "static",
            //     openAnalyzer: true,
            //     generateStatsFile: true,
            //     // Excludes module sources from stats file so there won't be any sensitive data
            //     statsOptions: {
            //         source: false
            //     }
            // }),
            // if you must, use the providerPlugin for shimming:
            // Used when you have i.e. jQuery plugins that rely on availability of the global $ variable to be present
            // which in modular JS is not the case. shimming is therefore not recommended as it pollutes the global namespace
            // https://webpack.js.org/guides/shimming/
            // new webpack.ProvidePlugin({
            //     $: "jquery",
            //     jQuery: "jquery",
            //     "window.jQuery": "jquery"
            // }),
            new CleanWebpackPlugin(distfolder), // deletes the dist folder before new build starts
            // https://webpack.js.org/plugins/context-replacement-plugin/
            // ContextReplacementPlugin: Moment.js https://stackoverflow.com/a/25426019/2581562
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css"
                //chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin()
        ]
    }
}; 