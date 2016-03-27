
module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname + '/dest',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};
