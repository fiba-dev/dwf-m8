const path = require("path");
const dev = process.env.NODE_ENV == "development";
const liveServer = require("live-server");
if (dev) {
	liveServer.start({
		root: "./",
		file: "index.html",
	});
}
module.exports = {
	watch: dev,
	entry: "./src/index.tsx",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ["style-loader",{loader:"css-loader",
				options:{
					modules:true
				}
			} ],

			},{
				test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$|\.woff(2)?$|\.ttf$|\.eot$/,
				loader: 'file-loader',
				options: {
				  name: '[name].[ext]'
				}  
			}
		],
	},
	resolve: {
		extensions: [".tsx", ".js",".ts"],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
};
