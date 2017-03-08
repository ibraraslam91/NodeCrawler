var sandcrawler = require('sandcrawler');
var dashboard = require('sandcrawler-dashboard');
var spider = sandcrawler.spider();
//spider.use(dashboard());
var count=1;
var runningD = false;
var urlE = 'https://www.olx.com.pk/mobile-phones/?page=';
spider.url('https://www.olx.com.pk/mobile-phones/');
//var deepSpider = sandcrawler.phantomSpider();
var deepSpider = sandcrawler.spider();
spider.scraper(function($,done){
    var data = $('table.fixed').scrape({
        links : {sel : 'a.marginright5.link.linkWithHash.detailsLink',attr: 'href'}
    });
    done(null,data);
});

spider.limit(1);


spider.result(function(err,req,res){
    if(!err){
        var arr = res.data;
        arr.splice(0, 1);
       // console.log(arr);
        arr.forEach(function(data1){           
            console.log("Ad Links : "+data1.links);
            deepSpider.addUrls(data1.links);
            
        })
        count++;
        this.addUrls(urlE+count);
    }else{
        console.log(err);
    }
});

spider.run(function(err,remains){
    console.log('Finished!');
});
deepSpider.run(function(err,remains){
    console.log('Deep');
})

deepSpider.result(function(err,req,res){
    runningD = false;
    if(!err){
       console.log(res.data);
    }else{
        console.log(err);
    }
});


deepSpider.scraper(function($,done){
    var data = $('div.clr.offerbody').scrape({
        title : function() {
            return $(this).find('h1.brkword.lheight28').text().trim().replace('\r\n\t\t\r\n', '');
          },
        location : function() {
            return $(this).find('strong.c2b.small').text().trim().replace('\r\n\t\t\t\t', '').replace('\t', '').trim();
          },
        imgUrl : {sel : 'a.lbutton'},
        price : {sel : 'strong.xxxx-large.margintop7.block.not-arranged'},
        dec : function() {
            return $(this).find('.pding10.lheight20.large').text().trim().replace(/[.*+?^${}()|[\]\\\n]/g,' ');
          }
    });   
    done(null,data);
});