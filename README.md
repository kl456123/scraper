# scraper
scrapy some data about what you want from web


##super easy to use
just instantiate [Scrapyer](#Scraper) and then set up something necessary for scrapying webpage.

```js
import Scrapyer from 'path to scrapyer.js';

<!-- instantiate it -->
let scrapyer = new Scrapyer()


<!-- set up  sth necessay-->

<!-- initial scrapyer for seting up http header  -->
<!-- The next version we will cancel it. -->
scraper.initial();

<!-- set up url for scrapying -->
scrapyer.seturl('http://www.zhihu.com/');

<!--set up html band for what you want to scrapy-->
scrapyer.setSelector('a');

<!-- start it -->
scrapyer.start();

```
if you want to set up more ,go to [configuration](#configuration).



## Table of contents
- [message queue](#message-queue)
- [simulate login](#simulate-login)
- [configuration](#configuration)
- [download](#download)
- [unit test](#unit-test)
- [utils](#utils)
- [experiment](#experiment)
- [multiply process](#multiply-process)



## message queue

It just a queue using for saving url in master process.
It has some methods for operating urls,such as 'push','pop'...

```js
<!-- es6 format -->
import Queue from 'path to message.js';

let queue = new Queue();
let url = 'http://www.zhihu.com/';
<!-- push url into queue -->
queue.push(url);
<!-- pop front url from queue and return it -->
let front = queue.pop();
```
And it has more function to use ,list below.

###getLength
return the length of queue
```js
<!-- queue clear -->

queue.push(2);
let length = queue.getLength();
<!-- length is  1-->
```

###isEmpty
return bool value of the queue is empty
```js
let state = queue.isEmpty();
<!-- state is true -->
```

###pushAll
push array into queue.(it is different from push in arguements)
```js

queue.pushAll([1,2,3]);

```

###pushAllFilter
push array into queue not repeating(not repeating emphasize three times)
```js
queue.pushAllFilter([1,1,2]);
<!-- [1,2] in queue -->
```
###front
return the front one and not pop it
```js
queue.pushAll([1,2,3]);
let front = queue.front();
<!-- front value is 1 -->
let length = queue.getLength();
<!-- length is 3 -->
```

---

##configuration

if you want to change the default configuration of scrapyer ,you should know it well.

You can read 'default.js and handlerDefaultConfig.js' in 'conf' directory to it .
If you want to disable some configuration ,comment it.


---

##utils
There are some utils to use when you scrapy web page.
It is very convenient to use ,I think personally..\=-=/
And it is very kind to developer.

###ioUtils
Just from its name ,we can know that it is for input and output.
some operations about file and database.(Here we use mongodb)

###webUtils
deal with urls and cookies

###utils
the rest functions are placed here

---

##experiment
Due to not familar with some syntax of es6 and some functions of tools,we did some experiments here.

It can be deleted in the furture.

---

##handler

It is a class in a word . Then I will talk about how to use it.
It has two main function,one for textDownload, the other for fileDownload. It can just be adjusted by 'setIsText'.

```js
<!-- first we instantiate it -->
let handler = new Handler();
<!-- isText true
  Due to the default configuration, you can not set up it
  -->
handler.setIsText(1);

<!-- it must be text html band -->
let selector = 'p';
<!-- It is obvious that it is necessary ,so ...-->
handler.setSelector(selector);

<!-- Now we start it . -->
<!-- page is html code got by requesting the url -->
let url ='http://www.zhihu.com/';

handler.handle(page,url);
<!-- Then you can find 'demo' in the default download path('data/text') -->
<!-- so it is very easy -->
```


---

##scrapyer
Just like handler before, it is a class, too.
you can set up sth rather than by configuration file.

```js
<!-- set up Non-Text -->
scrapyer.setNotText();

<!-- set up isDownloadPage:true,default is true -->
scrapyer.setIsDownloadPage(true);

<!-- set up path  to page-->
let path = 'path to download '
scrapyer.setDownloadPagePath(path);

<!-- logger level for view -->
let level = 'INFO'
scrapyer.setLoggerLevel(level);

<!-- chraset -->
<!-- default is utf-8 -->
scrapyer.setChraset('utf-8');

```
invole start() to start scrapyer like before.



---

#features
In this project, we improve its effience continue.

##multiply process
For its speed, we start some process to handle webpage.
The process is divided into two . one is master process for deal with message queue,others are slave processes for scrapying webpage and handle it.
Details can be seen in 'multiProcess.js'.
If you want to know how to use it,see 'multiScrapy.js' for example.


---

##simulate login
Due to some website needing cookie ,we should deal with it when posting http header.
We code a sample in 'login.js' to log in https://www.zhihu.com/ . At last we can get its finial web page.

---
##store
In the project ,we use [mongodb](https://www.mongodb.com) as  database. It is kind to js.
We can put JSON object into it .
We caspluse many functions to use for convinence in this project. Details can be seen in utils directory.

And if you don't want to use database,just save data in files.













