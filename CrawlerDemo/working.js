// Let's start by requiring the library
var sandcrawler = require('sandcrawler');

// Now let's define a new spider and start chaining
var spider = sandcrawler.spider()

  // What we need is to hit the following url
  .url('https://www.olx.com.pk/mobile-phones/')

  // With the following scraper
  .scraper(function($, done) {

    var data = $('h3.large').scrape({
      title: {sel: 'span'}      
    });

    done(null, data);
  })

  // So that we can handle its result
  .result(function(err, req, res) {
    console.log('Scraped data:', res.data);
  });

  spider.run(function(err, remains) {
  console.log('Finished!');
});