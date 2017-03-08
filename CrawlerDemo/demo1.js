var sandcrawler = require('sandcrawler');
var spider = sandcrawler.spider();
var count=1;
var urlE = 'https://www.olx.com.pk/mobile-phones/?page=';
spider.url('https://www.olx.com.pk/mobile-phones/');
spider.scraper(function($,done){
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
spider.result(function(err, req, res) {
    if(!err){
        console.log('Scraped data:', res.data);
        console.log(res.url);       
        count++;
        this.addUrls(urlE+count);
    }
});
spider.run(function(err,remains){
        console.log('Finished! 2');        
});
