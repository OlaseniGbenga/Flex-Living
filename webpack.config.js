/* eslint-disable no-undef */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
  output:{
    filename:"[name].bundle.js",
    path:path.resolve(__dirname,"dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  devtool: "source-map",
};
