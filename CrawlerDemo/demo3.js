var sandcrawler = require('sandcrawler');
var spider = sandcrawler.spider();
spider.url('https://www.olx.com.pk/item/i9-noir-q-mobile-working-perfect-IDW25D2.html#d6158d21e5');
spider.scraper(function($,done){
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
    //console.log($('div.photospace.rel').html());
    done(null,data);
});
spider.result(function(err,req,res){
    runningD = false;
    if(!err){
       console.log(res.data);
    }else{
        console.log(err);
    }
});
spider.run(function(err,remains){
    console.log('Finished!');


});



