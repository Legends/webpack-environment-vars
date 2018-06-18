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
    console.log(process.env.theme);

    return {
        entry: './src/index.js',
        output: {
            path: distfolder,
            filename: 'bundle.js'
        },
        resolve: {
            alias: {
                "theme$": path.resolve(theme),
                "themeA$": path.resolve("./src/css/themeA.css"),
                "themeB$": path.resolve("./src/css/themeB.css")
            }
        },
        optimization: {
            runtimeChunk: true
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: "env" // ['@babel/preset-env']
                    }
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
            new CleanWebpackPlugin(distfolder), // deletes the dist folder before new build starts

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