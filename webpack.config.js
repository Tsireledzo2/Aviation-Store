// const path = require("path");
// const webpack = require("webpack");
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   mode: "development",
//   devtool: "cheap-module-eval-source-map",
//   entry: {
//     main: path.resolve(process.cwd(), "src", "main.js")
//   },
//   output: {
//     path: path.resolve(process.cwd(), "docs"),
//     publicPath: ""
//   },
// 	node: {
//    fs: "empty",
// 	 net: "empty"
// 	},
//   watchOptions: {
//     // ignored: /node_modules/,
//     aggregateTimeout: 300, // After seeing an edit, wait .3 seconds to recompile
//     poll: 500 // Check for edits every 5 seconds
//   },
//   plugins: [
//     new FriendlyErrorsWebpackPlugin(),
//     new webpack.ProgressPlugin(),
//     new HtmlWebpackPlugin({
//       template: path.resolve(process.cwd(), "public", "index.html")
//     })
//   ]
// }

// const path = require("path");
// const webpack = require("webpack");
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   mode: "development",
//   devtool: "cheap-module-eval-source-map",
//   entry: {
//     main: path.resolve(process.cwd(), "src", "main.js")
//   },
//   output: {
//     path: path.resolve(process.cwd(), "dist"),
//     publicPath: "/",
//     filename: "[name].bundle.js"
//   },
//   node: {
//     fs: "empty",
//     net: "empty"
//   },
//   watchOptions: {
//     aggregateTimeout: 300,
//     poll: 500
//   },
//   devServer: {
//     contentBase: path.join(process.cwd(), "dist"),
//     compress: true,
//     port: 9000,
//     hot: true,
//     open: true,
//     historyApiFallback: true,
//     quiet: true, // This enables FriendlyErrorsWebpackPlugin
//     watchContentBase: true
//   },
//   plugins: [
//     new FriendlyErrorsWebpackPlugin(),
//     new webpack.ProgressPlugin(),
//     new HtmlWebpackPlugin({
//       template: path.resolve(process.cwd(), "public", "index.html")
//     }),
//     new webpack.HotModuleReplacementPlugin()
//   ]
// };

const path = require("path");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ignoredWarnings = [
  {
      module: /express\/lib\/view\.js$/,
      message: /Critical dependency: the request of a dependency is an expression/,
  },
];

module.exports = {
  mode: "development",
  ignoreWarnings: ignoredWarnings,
  devtool: "eval-source-map",
  entry: {
    main: path.resolve(process.cwd(), "src", "main.js")
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
    filename: "[name].bundle.js"
  },
  externals: {
    express: 'commonjs express'
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url/"),
      "fs": require.resolve("browserify-fs"),
      "net": require.resolve("net-browserify"),
      "vm": require.resolve("vm-browserify"),
      "path": require.resolve("path-browserify"), // Polyfills 'path'
      "zlib": require.resolve("browserify-zlib"), // Polyfills 'zlib'
      "querystring": require.resolve("querystring-es3") ,// Polyfills 'querystring'
      "async_hooks": false 
      // Add other polyfills as necessary
    }
  },
  
  
  
  node: {
    __dirname: false,
    __filename: false,
    global: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  },
  devServer: {
    static: {
      directory: path.join(process.cwd(), "dist"),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      logging: 'none', // This replaces 'quiet'
    },
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        usePolling: false,
      },
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "public", "index.html")
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
