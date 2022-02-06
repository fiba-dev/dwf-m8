const path = require("path");
const dev = process.env.NODE_ENV == "development";
const nodeExternals = require('webpack-node-externals');

const liveServer = require("live-server");

console.log("liveserverports",liveServer);
if (dev) {
	liveServer.start({
		root: "./",
		file: "index.html",
	});
};
const common = {
	
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

			},
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$|\.woff(2)?$|\.ttf$|\.eot$/,
				loader: 'file-loader',
				options: {
				  name: '[name].[ext]'
				}  
			}
		],
    },
    plugins: [ /* common plugins */ ],
    resolve: {
        extensions: [".tsx", ".js",".ts"] // common extensions
    },

    // other plugins, postcss config etc. common for frontend and backend
};
const frontend = {
	
    entry: "/fe-src/index.tsx",
	
    output: {
		path: path.resolve(__dirname, "dist"),
       filename: 'frontend-output.js'
    },
	

    // other loaders, plugins etc. specific for frontend
};
const backend = {
	
    entry:"/be-src/index.ts",
	
    output: {
		path: path.resolve(__dirname, "dist"),
       filename: 'backend-output.js',
	   
    },
	
	
	target: 'node',
	
    externalsPresets: { node: true },
    externals:[nodeExternals()],

    // specify for example node_modules to be not bundled
    // other loaders, plugins etc. specific for backend
};
module.exports =[ Object.assign({} , common, frontend),
    Object.assign({} , common, backend),
   
   
]


