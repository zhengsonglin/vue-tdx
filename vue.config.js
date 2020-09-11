const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	parallel: false,
	outputDir: '../docs',
	publicPath: process.env.NODE_ENV === 'production' ? '/ts-tdx/' : '/',
	lintOnSave: false, //关闭eslint或者tslint代码检查
	devServer: {
		// open: process.platform === 'darwin',
		//host: '0.0.0.0',
		//port: 8080,
		https: false,
		hotOnly: false,
		disableHostCheck: true,
		// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
		proxy: {
			'/api': {
				"target": 'https://www.taodaxiong.cn/', //对应自己的接口 如：http://127.0.0.1:8100/
				"changeOrigin": true,
				"ws": true,        //如果要代理 websockets，配置这个参数
				"secure": false,  // 如果是https接口，需要配置这个参数
				"pathRewrite": {
					'^/api': ''
				}
			}
		}, // string | Object
		before: app => {
			
		}
	},
	chainWebpack: config => {
		config.module
			.rule('ts')
			.use('ts-loader')
			.tap(options => {
				options = merge(options, {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [
							tsImportPluginFactory({
								libraryName: 'vant',
								libraryDirectory: 'es',
								style: true
							})
						]
					}),
					compilerOptions: {
						module: 'es2015'
					}
				});
				return options;
			});
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
};
