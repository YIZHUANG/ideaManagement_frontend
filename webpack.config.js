module.exports = {
    entry: './src/App.js',
    module: {
        loaders: [
         {
        test: /.jsx/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
	  {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
        loader: 'file-loader'
      }
        ]
    },
    output: {
        filename: 'bundle.js'
    }
};