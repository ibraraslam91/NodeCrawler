var sandcrawler = require('sandcrawler');
var spider = sandcrawler.spider()
  .url('https://www.olx.com.pk/mobile-phones/')
  .scraper(function($, done) {
    done(null, {nextUrl: $('.next-page').attr('href')});
  })
  .result(function(err, req, res) {
    if (!err && res.data.nextUrl)
      this.addUrl(res.data.nextUrl);
  });