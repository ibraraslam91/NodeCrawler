const translate = require('google-translate-api');

translate('4G let sported Back sensor Finger print lock No fault  7 inch screen Android varsion 6.0 2 GB Ram  16 GB ROM  5mp front with flash and 8mp back camera with flash no open no repair  Good battery timing  just grass crack but working 100,%ok,metting place near ayube national park alshafa', {to: 'ru'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});