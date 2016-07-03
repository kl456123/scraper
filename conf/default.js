// default configuration
// if you want to change ,comment it
let settings = {
  // download text or not text.
  "isText": 1,

  // download delay for not be banned
  "delay": 0,

  // download filename
  "filename": "demo",

  // download path(to save file)
  "downloadPath": "/home/breakpoint/Documents/code/project/JS/crawler/scraper/data/",

  // logger level
  // you can select from ['ALL','TRACE','WARN','DEBUG','FATAL','INFO']
  "loggerLevel": "ALL",

  // need  to configue head request by default
  "HEAD": true,

  // download webpage when scrapy webpage
  "isDownloadPage": true,

  // recurrent scrapy webpage
  "recurrent": false,

  // if enable recurrent ,urlSelector must be seted.
  "urlSelector": "a",

  // saving method
  "store": "FILE",

  // chraset default utf-8
  "chraset": "UTF-8"
}

export default settings;