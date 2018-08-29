var express = require('express');
var request = require('request');
var router = express.Router();


/* GET index page. */
/* 数据列表*/
router.get('/', function(req, res, next) {
  // 数据
  var data = {
    title: 'news',
    time: (new Date).toString(),
    list: [
      {
        id: '1',
        name: 'Lily'
      },
      {
        id: '2',
        name: 'Jenny'
      }
    ]
  }
  // 渲染模板
  res.render('index', data);
});

/* GET home page. */
/* 请求数据接口 */ 
router.get('/home',function(req,res,next){
  // 正式数据
  request('http://shopapi.ztuimedia.com/area/mobile-country-select', function (err, response, data) {
    // console.log(err, data, response)
    if ( response.statusCode==200){
      /*把字符串转换为json*/
      var data = JSON.parse(data);
      console.log(111,data)
      /*渲染模板*/
      res.render('home', {list:data.data});
    }
  // res.render('home', {});
  })
})

router.get('/list',function(req,res,next){
  
})



module.exports = router;
