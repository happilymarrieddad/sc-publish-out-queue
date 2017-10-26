var DEFAULT_TIMEOUT = 10;
var DEFAULT_NUM_OF_MESSAGE_PER_PASS = 100;

module.exports = {
	attach:function(worker,options) {

		options = options || {};

		var scServer = worker.scServer;
		var queue = [];
		var debug = options.debug || false;
		var timeout = options.timeout || DEFAULT_TIMEOUT;
		var num_of_messages_per_pass = options.numOfMessagesPerPass || DEFAULT_NUM_OF_MESSAGE_PER_PASS;

		var handler = function() {
			var num_of_packets = queue.length

			var packets = [];
			for (var i = 0; i < num_of_messages_per_pass; i++) {
				if (queue.length) packets.push(queue.shift());
			}

			for (var i = 0,len = packets.length; i < len;i++) {
				var packet = packets[i]
				var data = packet.req.data
				var event = packet.req.event
				// var socket = packet.req.socket

				if (debug) {
					console.log('Publishing data to clients',event);
				}

				packet.next(null,data);
			}

			if (debug && num_of_packets) {
				console.log('Number of packets left in the queue: ',queue.length)
			}

			setTimeout(() => handler(),timeout);
		}
		handler();

		scServer.addMiddleware(scServer.MIDDLEWARE_PUBLISH_OUT,function(req,next) {

			if (debug) {
				console.log('Storing packet in queue');
			}

			queue.push({
				req:req,
				next:next
			})

		});

	}
}