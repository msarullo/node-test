console.time('MSTEST');
console.log('MSTEST - STARTED...');

// set up exit handler
process.on('exit', function() {
	console.log('MSTEST - DONE...');
	console.timeEnd('MSTEST');
})

// set up exeception handler
process.on('uncaughtException', function(err) {
	console.log('\nMSTEST - Caught Unhandled Exception:\n>>>>>');
	console.log(err);
	console.log('<<<<<');
});

try {
	var http = require('http')

	// set up http proxy
//	console.log('MSTEST - Initializing HTTP Proxy Settings...')
//	var httpOptions = http.globalAgent.options
//	httpOptions.proxy = 'http://127.0.0.1:8080'
//	console.log('MSTEST - httpOptions:\n>>>>>');
//	console.log(httpOptions);
//	console.log('<<<<<');

	// test request
	console.log('MSTEST - Making http request to google...')
	req = http.get('http://www.google.com', function(res){
		console.log('MSTEST - Google HTTP test response status:  ' + res.statusCode);
		console.log('MSTEST - Response headers:\n>>>>>');
		console.log(res.headers);
		console.log('<<<<<');
	})

} catch (err) {
	console.log('\nMSTEST - Caught Exception:\n>>>>>\n' + err + '\n<<<<<\n');
}

