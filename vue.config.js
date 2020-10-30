// 你可以在 vue.config.js 文件中计算环境变量。它们仍然需要以 VUE_APP_ 前缀开头。这可以用于版本信息:
process.env.VUE_APP_VERSION = require('./package.json').version

// import handleBefore from './mock/mock-server.js'

const path = require('path');
// const axios = require('axios')
// const qs = require('qs')

function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	runtimeCompiler: true,
	productionSourceMap: false,
	publicPath: '/', // 设置打包文件相对路径,默认为'/', 等同于环境变量中的BASE_URL, (BASE_URL为内置的环境变量，只能通过当前的publicPath修改，在env文件中修改是无效的)
	outputDir: 'dist',
	devServer: {
		// open: process.platform === 'darwin',
		//host: '0.0.0.0',
		//port: 8080,
		https: false,
		hotOnly: false,
		disableHostCheck: true,
		// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
		proxy: {
			'/api/': {
				"target": 'https://www.taodaxiong.cn/', //对应自己的接口 如：http://127.0.0.1:8100/
				"changeOrigin": true,
				"ws": true,        // 如果要代理 websockets，配置这个参数
				"secure": false,  // 如果是https接口，需要配置这个参数
				"pathRewrite": {
					'^/api/': ''
				}
			},
			'/api2/': {
				"target": 'https://www.taoxiaoxiong.cn/',	//对应自己的接口 如：http://127.0.0.1:8100/
				"changeOrigin": true,
				"ws": true,        // 如果要代理 websockets，配置这个参数
				"secure": false,  // 如果是https接口，需要配置这个参数
				"pathRewrite": {
					'^/api2/': ''
				}
			},

		}, // string | Object
		// before: require('./mock/mock-server.js'),	// 通过express重新发送请求，mock响应数据(服务端mock)，本地请求拦截main.js配置即可
		/*
		before: app => {
			app.post('/api/sys/login', function (req, res) {
			  var url = 'https://www.taodaxiong.cn/sys/login'

			  console.log(123, req)

			  axios.post(url, {	//qs.stringify(data),
			    headers: {
			      //referer: 'https://www.taodaxiong.cn/uh5/index.html?',
			      //host: 'www.taodaxiong.cn'
			    },
			    params: {
			    	user: "19972512216",
					pwd: "zl123456",
					platform: "2c"
			    }

			  }).then((response) => {
			  	console.log(err, response)
			    res.json(response.data)
			  }).catch((e) => {
			    console.log(e)
			  })
			})*/
			/*app.post('/api/Mobile/LoginCheck', function (req, res) {
			  var url = 'http://www.taodaxiong.cn/Mobile/LoginCheck'
			  http://www.taodaxiong.cn/Mobile/LoginCheck
			  console.log(res)
			  console.log(123)
			  console.log(req)

			  axios.post(url, {
			    headers: {
			      referer: 'http://www.taodaxiong.cn/Mobile/MobileLogin',
			      host: 'www.taodaxiong.cn'
			    },
			    params: {"txt_UserName":"18598271043","txt_PassWord":"zsl123456"}

			  }).then((response) => {
			  	console.log(err, response)
			    res.json(response.data)
			  }).catch((e) => {
			    console.log(e)
			  })
			})
		}
		*/
	},
	lintOnSave: true,
	chainWebpack: (config) => {
		config.resolve.alias
			.set('img', resolve('public/img'))
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
			.set('base', resolve('src/base'))
			.set('static', resolve('src/static'))
	},
	css: {
		loaderOptions: {
			css: {
				// 这里的选项会传递给 css-loader
				importLoaders: 1,
			},
			less: {
				// 这里的选项会传递给 postcss-loader
				importLoaders: 1,
			}
		}
	}

}
