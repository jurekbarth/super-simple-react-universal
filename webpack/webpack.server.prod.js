const path = require("path");
const webpack = require("webpack");

var commonLoaders = [
  {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    query: {
      "presets": ["es2015", "react", "stage-0"],
    },
    include: path.join(process.cwd(), 'app'),
    exclude: path.join(process.cwd(), 'node_modules')
  },
  { test: /\.json$/, loader: "json-loader" }
];

module.exports = [{
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(process.cwd(), 'app'),
    entry: {
      server: "./server"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: path.join(process.cwd(), 'build'),
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "serverRender.js",
      // The output path from the view of the Javascript
      publicPath: './',
      libraryTarget: "commonjs2"
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        })
    ],
  }, {
    // The configuration for the client-side rendering
    name: "client-side rendering",
    context: path.join(process.cwd(), 'app'),
    entry: {
      server: "./client"
    },
    target: "web",
    output: {
      // The output directory as absolute path
      path: path.join(process.cwd(), 'build/assets'),
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "clientRender.js",
      // The output path from the view of the Javascript
      publicPath: './',
    },
    module: {
      loaders: commonLoaders
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        })
    ],
  }
];
