var sandcrawler = require('sandcrawler');
var spider = sandcrawler.phantomSpider();
spider.url('http://www.httpuseragent.org');
spider.scraper(function($, done) {
    var data = {title : document.getElementById('myagent').textContent}

    done(null,data);
  });
spider.result(function(err,req,res){
    runningD = false;
    if(!err){
       console.log(res.data);
    }else{
        console.log(err);
        console.log('asd');
    }
});
spider.run(function(err,remains){    
    console.log('Finished!');
});