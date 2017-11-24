const JSSoup = require('jssoup').default;
const phantom = require('phantom');

var page = require('webpage').create();
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.open('http://www.httpuseragent.org', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    var ua = page.evaluate(function() {
      return document.getInnerHTML;
    });
    console.log(ua);
  }
  phantom.exit();
});