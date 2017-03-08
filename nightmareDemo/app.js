var Nightmare = require('nightmare');
var mysql = require("mysql");
var nightmare = Nightmare({ show: false });

nightmare
  .goto('https://www.olx.com.pk/item/i-star-g5-4g-sported-IDW1ki9.html#d6158d21e5')
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
  }).end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });