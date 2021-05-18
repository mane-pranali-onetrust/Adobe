// Node.js program to demonstrate the 
// response.setHeaders() Method
  
// Importing http module
var http = require('http');
// Setting up PORT
const PORT = process.env.PORT || 3000;

// Reading local privacy js
var Privacy = '';
var fs = require('fs')
fs.readFile(__dirname + '/privacy.min.js', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	else {
		//Privacy = '<script>' + data + '</script>';
		Privacy = '<script src="https://www.adobe.com/etc/beagle/public/globalnav/adobe-privacy/latest/privacy.min.js"></script>';
		// Creating http Server
		var httpServer = http.createServer(
			function(request, response) {

				// Setting up Headers
				response.setHeader('Content-Type', 'text/html');
				response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
				response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

				// Getting the set Headers
				const headers = response.getHeaders();

				// Printing headers
				console.log(headers);

				var Head = '<head>'
					+ '<script>'
					+ 'console.log("self.crossOriginIsolated: " + self.crossOriginIsolated);'
					+ '</script>'
					+ '<script>'
					+ 'window.fedsConfig = {'
					+ '    privacy: {'
					+ '        otDomainId: "7a5eb705-95ed-4cc4-a11d-0cc5760e93db-test"'
					+ '    }'
					+ '};'
					+ '</script>'
					+ Privacy
					+ '</head>'; 

				var Body = '<body>'
					+ 'Available headers are:'
					+ JSON.stringify(headers)
					+ '</body>'; 

				// Prints Output on the browser in response
				response.writeHead(200, 
				{ 'Content-Type': 'text/html' });
				response.write('<html>');
				response.write(Head);
				response.write(Body);
				response.write('</html>');
				response.end('');
				});

				// Listening to http Server
				httpServer.listen(PORT, () => {
				console.log("Server is running at port 3000...");
			}
		);

	}
});
