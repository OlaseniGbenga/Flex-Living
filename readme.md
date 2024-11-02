<!-- why i didnot implement webpack -->
i was going to implement webpack but i found that it would take lot of time to refactor the whole code now.
there should be dynamic css and assest import to js not static import in html

<!-- code from chatgbt-->
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: "./app.js",
    addHouse: "./pages/addHouse/addHouse.js",
    checkOut: "./pages/checkOut/checkout.js",
    deleteHouse: "./pages/deleteHouse/deleteHouse.js",
    houseDetails: "./pages/houseDetails/houseDetails.js",
    myAccount: "./pages/myAccount/myAccount.js",
    signIn: "./pages/signIn/signIn.js",
    signUp: "./pages/signUp/signUp.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
      },
      {
        test: /\.(js)$/,
        use: "babel-loader",
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html', // Path to your template
      chunks: ['app'], // Specify the entry point(s) to include
    }),
    new HtmlWebpackPlugin({
      filename: 'addHouse.html',
      template: 'src/addHouse.html',
      chunks: ['addHouse'],
    }),
    // Repeat for other pages as needed
  ],
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
};
