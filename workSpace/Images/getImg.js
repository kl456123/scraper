var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var gm = require('gm');
var handleUrl = require('./util.js').handleUrl;
var proRequest = require('./util.js').proRequest;
var handleImg = require('./util.js').handleImg;
var co = require('co');
var downloadFile = require('./util.js').downloadFile;
var dir = './img/';


function getImg(requrl) {

    return new Promise(function(resolve, reject) {

        request(requrl, function(error, response, body) {

            if (!error && response.statusCode == 200) {

                // console.log(body); //返回请求页面的HTML
                acquireData(body, requrl);

                resolve();
            } else {

                reject(error);
            }
        });
    });
}


function acquireData(data, requrl) {

    var $ = cheerio.load(data);

    var meizi = $('img').toArray();

    var len = meizi.length;

    console.log(len);

    meizi.forEach(function(meiziOne) {

        if (meiziOne == undefined)
            return;

        var imgsrc = meiziOne.attribs.src;

        console.log(imgsrc);

        var filename = parseUrlForFileName(imgsrc); //生成文件名

        imgsrc = handleUrl(imgsrc, requrl);

        if (imgsrc == undefined) return;

        var path = dir + filename;

        downloadFile(imgsrc, path, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }

            handleImg(path);

            console.log(filename + ' done');
        });
    });


}

function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}

// var downloadImg = function(uri, filename, callback) {
//     request.head(uri, function(err, res, body) {
//         // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
//         // console.log('content-length:', res.header); //图片大小
//         if (err) {
//             // console.log('err: ' + err);
//             return false;
//         }
//         request(uri).pipe(fs.createWriteStream(dir + filename)).on('close', callback); //调用request的管道来下载到 images文件夹下
//     });
// };



module.exports = getImg;

// function getImg(requrl) {
//     co(function*(requrl) {
//         yield proRequest(requrl)
//             .then(function(Obj) {
//                 acquireData(Obj.data, Obj.requrl);
//             })
//             .catch(function(err) {
//                 console.log(err);
//             });
//     });
// }