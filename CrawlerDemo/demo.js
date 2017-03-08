var sandcrawler = require('sandcrawler');
var spider2 = sandcrawler.spider();
spider2.url('https://www.olx.com.pk/mobile-phones/');
var spider = sandcrawler.spider()
  .url('https://www.olx.com.pk/mobile-phones/')
  
  .scraper(function($, done) {
    done(null, {nextUrl: $('span.fbold.next.abs.large a.link').attr('href')});
  });
spider2.scraper(function($,done){
    var data = $('table.fixed').scrape({      
      titel :{ sel : 'tr td h3 span' },
      image: {sel: 'tr td div span a img', attr : 'src'},
      city :{ sel : 'tr td p span' },
      price :function() {
            return $(this).find('.c000').text().replace('\n\t\t\t\t\t\t\t\t', '').replace('\t\t\t\t\t\t\t\t','');
          }
    });    
    done(null, data);
});
spider.result(function(err,req,res){
        if (!err && res.data.nextUrl){
            console.log(res.data.nextUrl);
            this.addUrl(res.data.nextUrl);
            spider2.addUrls(res.data.nextUrl);            
        }      
});
spider.run(function(err,remains){
    console.log('Finished! 1');
        spider2.run(function(err,remains){
        console.log('Finished! 2');        
    });
});
spider2.result(function(err, req, res) {
    console.log('Scraped data:', res.data);
    
});
