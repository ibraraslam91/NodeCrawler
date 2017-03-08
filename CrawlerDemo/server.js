// Let's start by requiring the library
var sandcrawler = require('sandcrawler');



// Now let's define a new spider and start chaining
var spider = sandcrawler.spider()

  // What we need is to hit the following url
  .url('https://www.olx.com.pk/mobile-phones/')

  // With the following scraper
  .scraper(function($, done) {
    
    
    var data = $('table.fixed').scrape({
      
      titel :{ sel : 'tr td h3 span' },
      image: {sel: 'tr td div span a img', attr : 'src'},
      city :{ sel : 'tr td p span' },
      price :function() {
            return $(this).find('.c000').text().replace('\n\t\t\t\t\t\t\t\t', '').replace('\t\t\t\t\t\t\t\t','');
          }
    });
    
    done(null, data);
  })
  .result(function(err, req, res) {
    console.log('Scraped data:', res.data);
    console.log('length:',res.data.length);
  });

  spider.run(function(err, remains) {
  console.log('Finished!');
});