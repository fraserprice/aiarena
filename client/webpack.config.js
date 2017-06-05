module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/public"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "eval",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.jsx?$/,
              loader: "babel-loader?cacheDirectory",
              exclude: /node_modules/,
              options: {
                presets: ['es2015', 'react']
              }
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/,
              loader: "awesome-typescript-loader" ,
              exclude: /node_modules/
            },
            // css loading
            { test: /\.css$/,
              exclude: /node_modules/,
              use: [
                "style-loader",
                "css-loader"
              ]
            },
            // svg loading
            { test: /\.svg$/,
              exclude: /node_modules/,
              use: [
                "url-loader"
              ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            //{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    devServer: {
        historyApiFallback: true
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },

};
