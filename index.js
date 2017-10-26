var DEFAULT_TIMEOUT = 50;
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
			if (debug && num_of_packets) {
				console.log('Publishing data to clients');
			}

			var packets = [];
			for (var i = 0; i < num_of_messages_per_pass; i++) {
				if (queue.length) packets.push(queue.shift());
			}

			for (var i = 0,len = packets.length; i < len;i++) {
				packets[i].next(null,packets[i].data);
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
				data:req.data,
				next:next
			})

		});

	}
}