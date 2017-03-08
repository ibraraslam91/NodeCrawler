'use strict';



var Nightmare = require('nightmare');
var vo = require('vo'); 


var nightmare = new Nightmare({
    widt: 1200,
    height:1800,
    show: true,
    'webPreferences':{
        webSecurity: false,
        partition: 'persist:',
        images: false,
        webaudio: false,
        webgl: false

  }
});

var parsePage = function(searchString){
    nightmare
      .goto(searchString)
      .wait(10000)
      .evaluate(function(){
        var results =[];
        var selector = document.documentElement.querySelectorAll('#normalook_mod_sr .title_modn_sr a');
        
        for (x=0; x<selector.length; x++){
          results.push(document.documentElement.querySelectorAll('#normalook_mod_sr .title_modn_sr a')[x].href);
        }
        return results;
    })
    .end()
    .then(function(result){
        console.log(result)
    })
};

var getEmail = function(url){

    nightmare
      .goto(url)
      .wait(1000)
      .evaluate(function(){
        function extractEmails ( text ){
          return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        }
        var email = extractEmails(document.documentElement.querySelector('#tittlejob_jo').textContent);
        var job_position = document.documentElement.querySelector('[itemprop=title]').textContent;
        //var corp = document.documentElement.querySelector('[itemprop=name]').textContent;
        //var contact = document.documentElement.querySelector('[itemprop=address] [itemprop=name]').textContent;
        //var tel= document.documentElement.querySelector('[itemprop=telephone]').textContent;
        if(email){
          return email[0];
        }else{ 
          console.log('empty')
        }
      })
      .end()
      .then(function(result){
        console.log(result)
      })
};

var url = 'https://www.occ.com.mx/Empleo/Oferta/9243223-ejecutivo-a-de-cuenta-para-tulancingo-de-bravo';
getEmail(url);