(function() {

	var multiplex = Reveal.getConfig().multiplex;
	var socketId = multiplex.id;
	var socket = io.connect(multiplex.url);

	socket.on(multiplex.id, function(message) {
		// ignore data from sockets that aren't ours
		if (message.socketId !== socketId || window.location.host === 'localhost:1947')
			return;

		if (message.state) {
			Reveal.setState(message.state);
		}

		// backward compatible detection and consumption of message.content
		if (message.content) {
			var event = new CustomEvent('received', { content: message.content, detail: message.content });
			document.dispatchEvent(event);
		}

		if (message.detail) {
			var event = new CustomEvent('multiplex-received', { detail: message.detail });
			document.dispatchEvent(event);
		}
	});
}());
