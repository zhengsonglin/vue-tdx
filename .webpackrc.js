const pxtorem = require('postcss-pxtorem');
const pxtorem2 = _interopRequireDefault(pxtorem).default;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

export default {
  entry: 'src/index.js',
  disableCSSModules: false,
  extraBabelPlugins: [
    ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": true }]// `style: true` 会加载 less 文件, 默认css
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
      extraPostCSSPlugins: [
				pxtorem2({ rootValue: 32, propWhiteList: [], })
	    ]
    },
    production: {
			extraBabelPlugins:['dva-hmr'],
	    extraPostCSSPlugins: [
	      pxtorem2({ rootValue: 32, propWhiteList: [], })
	    ]
	  }
  },
  publicPath: '/',
  proxy: {
    "/api": {
      "target": "https://www.taodaxiong.cn/",
      "changeOrigin": true,
      "ws": true,        //如果要代理 websockets，配置这个参数
      "secure": false,  // 如果是https接口，需要配置这个参数
      "pathRewrite": { "^/api" : "" }
    }
  }
}
