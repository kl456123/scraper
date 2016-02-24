var url = require('url');



/**
 * preprocess url to use for Request
 * @param  {string} url    relative position of the webpage
 * @param  {string} preUrl main url of the webpage
 * @return {string/undefined}        aviliable url to visit in the brower.if error,return undefined.
 */
function handleURL(URL, preURL) {

  // handle preUrl

  var URLParse = url.parse(preURL);

  var protocol = URLParse.protocol;
  var host = URLParse.host;
  preURL = protocol + '//' + host;

  // ignore error url
  /*jshint scripturl:true*/
  if (URL === undefined || URL === 'javascript:;' || URL === '/') {
    // throw new Error("url is undefined!");
    return;
  }
  URL = URL.trim();
  // add http prex
  if (URL.slice(0, 2) === '//') {
    var head = 'http:';
    URL = head.concat(URL);
  }

  // add static path
  if (URL[0] === '/') {
    URL = preURL.concat(URL);
  }

  if (URL[0] === '.') {
    URL = preURL.concat(URL.slice(1));
  }
  if (URL.slice(-1) === '/') {
    URL = URL.slice(0, -1);
  }
  // remain
  return URL;

}


/**
 * handle cookie for convenience.
 * @param {string} cookie   cookie of http requests.
 *
 */

function cookieParse(cookie) {

}



var exportObj = {};

exportObj.handleURL = handleURL;



module.exports = exportObj;