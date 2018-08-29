/**
 * 
superagent
superagent(http: //visionmedia.github.io/superagent/ ) 是个轻量的的 http 方面的库，是nodejs里一个非常方便的客户端请求代理模块，当我们需要进行 get 、 post 、 head 等网络请求时，尝试下它吧。

cheerio 
cheerio(https: //github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

eventproxy 
eventproxy(https: //github.com/JacksonTian/eventproxy ) 非常轻量的工具，但是能够带来一种事件式编程的思维变化。

 */ 




var http = require('http'),
    url = require('url'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    async = require('async'),
    eventproxy = require('eventproxy');

var ep = new eventproxy(),
    urlsArray = [], //存放爬取网址
    pageUrls = [], //存放收集文章页面网站
    pageNum = 200; //要爬取文章的页数

for (var i = 1; i <= 200; i++) {
    pageUrls.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=SiteHome&ItemListActionName=PostList&PageIndex=' + i+'&ParentCategoryId=0');
}

// 主start程序
function start() {
    function onRequest(req, res) {
        // 轮询 所有文章列表页$
        pageUrls.forEach(function (pageUrl) {
            superagent.get(pageUrl)
                .end(function (err, pres) {
                    // pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
                    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                    // 剩下就都是利用$ 使用 jquery 的语法了
                    var $ = cheerio.load(pres.text);
                    var curPageUrls = $('.titlelnk');

                    for (var i = 0; i < curPageUrls.length; i++) {
                        var articleUrl = curPageUrls.eq(i).attr('href');
                        urlsArray.push(articleUrl);
                        // 相当于一个计数器
                        ep.emit('BlogArticleHtml', articleUrl);
                    }
                });
        });

        ep.after('BlogArticleHtml', pageUrls.length * 20, function (articleUrls) {
            // 当所有 'BlogArticleHtml' 事件完成后的回调触发下面事件
            // 打印页面url
            res.write('<br/>');
            res.write('articleUrls.length==' + articleUrls.length+'<br/>')
            for(var i =0;i<articleUrls.length;i++){
                res.write('articleUrl == '+ articleUrls[i]+'<br/>')
            }
            // 控制并发数
            var curCount = 0;
            var reptileMove = function(url,callback){
                // 延迟毫秒数
                var delay = parseInt((Math.random()*30000000)%1000,10)
                curCount++;
                console.log('现在并发数',curCount,'正在抓取=',url,'耗时'+delay+'ms');

                superagent.get(url).end(function(err,sres){
                    // sres.text 里面存储着请求返回的html内容
                    var $ = cheerio.load(sres.text);
                    // 收集数据 拼接URL
                    var currentBlogApp = url.split('/p/')[0].split('/')[3],
                        appUrl = "http://www.cnblogs.com/mvc/blog/news.aspx?blogApp=" + currentBlogApp;
                        console.log('currentBlogApp', currentBlogApp)
                    // 具体收集函数
                    // personInfo(appUrl)
                })
                setTimeout(function () {
                    curCount--;
                    callback(null, url + 'Call back content');
                }, delay);
               
            }
             // 使用async控制异步抓取   
             // mapLimit(arr, limit, iterator, [callback])
             // 异步回调
             async.mapLimit(articleUrls, 5, function (url, callback) {
                 reptileMove(url, callback);
             }, function (err, result) {
                 // 4000 个 URL 访问完成的回调函数
                 // ...
             });
        });
       
    }
   
    http.createServer(onRequest).listen(3000);
}
exports.start = start;


