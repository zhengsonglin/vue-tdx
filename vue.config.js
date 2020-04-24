const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
	runtimeCompiler: true,
  	publicPath: '/', // 设置打包文件相对路径
	//baseUrl: '/',
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
	      '/api': {
	        target: 'http://127.0.0.1:8100/', //对应自己的接口
	        changeOrigin: true,
	        ws: true,
	        pathRewrite: {
	          '^/api': ''
	        }
	      }
	    }, // string | Object
        before: app => {}
    },
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('views',resolve('src/views'))
            .set('base',resolve('src/base'))
            .set('static',resolve('src/static'))
    },
   
    
}