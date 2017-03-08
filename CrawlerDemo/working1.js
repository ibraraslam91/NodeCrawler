
var sandcrawler = require('sandcrawler');

var spider = sandcrawler.spider()
  .urls(['https://www.olx.com.pk/mobile-phones/',
       'https://www.olx.com.pk/mobile-phones/?page=2',
       'https://www.olx.com.pk/mobile-phones/?page=3',
       'https://www.olx.com.pk/mobile-phones/?page=4',
       'https://www.olx.com.pk/mobile-phones/?page=5',
       'https://www.olx.com.pk/mobile-phones/?page=6',
       'https://www.olx.com.pk/mobile-phones/?page=7',
       'https://www.olx.com.pk/mobile-phones/?page=8',
       'https://www.olx.com.pk/mobile-phones/?page=9',
       'https://www.olx.com.pk/mobile-phones/?page=10',
       'https://www.olx.com.pk/mobile-phones/?page=11',
       'https://www.olx.com.pk/mobile-phones/?page=12',
       'https://www.olx.com.pk/mobile-phones/?page=13',
       'https://www.olx.com.pk/mobile-phones/?page=14',
       'https://www.olx.com.pk/mobile-phones/?page=15',
       'https://www.olx.com.pk/mobile-phones/?page=16',
       'https://www.olx.com.pk/mobile-phones/?page=17',
       'https://www.olx.com.pk/mobile-phones/?page=18',
       'https://www.olx.com.pk/mobile-phones/?page=19'
       ])
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