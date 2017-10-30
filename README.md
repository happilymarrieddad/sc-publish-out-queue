SC Publish Out Queue
====================

## Installation
```js
npm install sc-publish-out-queue --save
```

## Usage
```js
let scPublishOutHandler = require('sc-publish-out-queue')

scPublishOutHandler.attach(worker,{
	debug:true,				// Defaults to false
	timeout:100, 			// in milliseconds; defaults to 10
	numOfMessagesPerPass 	// Num of packets it will clear at a time; defaults to 100
})
```

## Example
There is an example in the sample folder. You need to first spin up a state server and a broker. You can just clone the socketcluster repos for this if you want. Then npm start the sample folder. Open up a browser to localhost:8000. Open your dev tools and send a socket.publish('send-data',{ id:1 }) and every client that's connected will see this message only once per a publish. The system is ALIVE! Thanks!