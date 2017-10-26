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