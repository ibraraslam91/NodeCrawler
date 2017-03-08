const translate = require('google-translate-api');
var Nightmare = require('nightmare'),
  vo = require('vo'),
  nightmare = Nightmare({ show: true });

var run = function * () {
  var urls = ['https://www.olx.com.pk/item/i-star-g5-4g-sported-IDW1ki9.html#d6158d21e5','https://www.olx.com.pk/item/samsung-galaxy-s6gold-IDW2g4Z.html#d6158d21e5','https://www.olx.com.pk/item/iphone-6s-factory-unlocked-IDW2g51.html#d6158d21e5'];

  for (var i = 0; i < urls.length; i++) {
    yield nightmare.goto(urls[i])
  .wait()
  .evaluate(function () {
      var data = {};
      data.title =  document.getElementsByClassName("brkword lheight28")[0].innerHTML.replace(/(?:\r\n|\r|\n|\t)/g, '').trim();
      data.location = document.getElementsByClassName("c2b small")[0].innerHTML.replace(/(?:\r\n|\r|\n|\t)/g, '').trim();
      data.price = document.getElementsByClassName("xxxx-large margintop7 block not-arranged")[0].innerHTML;
      data.contact = document.getElementsByClassName("large lheight20 fnormal  ")[0].innerHTML;
      data.name = document.getElementsByClassName("block color-5 brkword xx-large")[0].innerHTML;
      data.dec = document.getElementsByClassName("pding10 lheight20 large")[0].innerHTML.trim().replace(/<br>[.*+?^${}()|[\]\\\n]/g,' ');
      data.image = document.querySelector('#showOnlyImage').href;
      data.id =  document.querySelector("span.nowrap span.rel.inlblk").innerHTML.replace(/(?:\r\n|\r|\n|\t)/g, '').trim();
    return data;
  })  
  .then(function (result) {
    translate(result.title, {to: 'es'}).then(res => {
    result.title = res.text;    
      translate(result.dec, {to: 'es'}).then(res => {
      result.dec = res.text;
      console.log(result);
    }).catch(err => {
        console.error(err);
    });
    
  }).catch(err => {
      console.error(err);
  });
    
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
  }

  console.log('deom');
  

}

function getData(url){
    
}

vo(run)(function(err, titles) {

  
});