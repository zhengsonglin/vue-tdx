const path = require('path');
const axios = require('axios')
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	runtimeCompiler: true,
	publicPath: '/', // 设置打包文件相对路径
	outputDir: 'dist',
	devServer: {
		// open: process.platform === 'darwin',
		//host: '0.0.0.0',
		//port: 8080,
		https: false,
		hotOnly: false,
		disableHostCheck: true,
		// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
		/*proxy: {
			'/api': {
				target: 'http://www.taodaxiong.cn/', //对应自己的接口 如：http://127.0.0.1:8100/
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}, // string | Object*/
		before: app => {
			app.post('/api/Mobile/LoginCheck', function (req, res) {
			  var url = 'http://www.taodaxiong.cn/Mobile/LoginCheck'
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
	},
	lintOnSave: true,
	chainWebpack: (config) => {
		config.resolve.alias
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