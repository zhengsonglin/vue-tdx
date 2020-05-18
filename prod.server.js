var express = require('express')
//var config = require('./config/index')
//var axios = require('axios')
const proxyMiddlewar = require("http-proxy-middleware");

var port = 8989;	//process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

//用来处理类似jsonp回调数据
function callback(data){
	return data;
}

const os = require('os') //自动获取本地ip模块
const network = os.networkInterfaces() // 获得网络接口列表。
const host = network[Object.keys(network)[0]][1].address // 本机ip

//http://localhost:3000/api/..... —>  http://168.90.0.1:8080/api/....
//apiRoutes.use('/api', proxyMiddlewar(`http://${host}:7800`))	//这种代理等同于下面的代理

/*
apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)
*/

const config =  {
	target: 'http://www.taodaxiong.cn/', //对应自己的接口 如：http://127.0.0.1:8100/
	changeOrigin: true,
	ws: true,        //如果要代理 websockets，配置这个参数
	secure: false,  // 如果是https接口，需要配置这个参数
	pathRewrite: {
		'^/api': ''
	}
}
app.use('/api', proxyMiddlewar(config))

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})