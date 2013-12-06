console.time('MSTEST');
console.log('MSTEST - STARTED...');

// set up exit handler
process.on('exit', function() {
	console.log('MSTEST - DONE...');
	console.timeEnd('MSTEST');
})

// set up exeception handler
process.on('uncaughtException', function(err) {
	console.log('\nMSTEST - Caught Unhandled Exception:\n>>>>>\n' + err + '\n<<<<<\n');
});

// setup ice
console.log('MSTEST - Initializing ICE...')
var ice = require('nytd-ice-cream')({
    environment: 'localhost',
    memcached: '127.0.0.1:11211',
    logging: {
        name: 'ice',
        path: './ice.log',
        level: 'debug',
        showErrorStack: parseInt('1')
    }
});

try {
	// get all playlists
	console.log('MSTEST - Requesting all playlists...');
	ice.playlist.getAll(function(err, playlistData) {
		console.log('All Playlist Results:');
		console.log('err:\n>>>>>\n' + err + '\n<<<<<');
		console.log('playlistData:\n>>>>>\n' + playlistData + '\n<<<<<');
	});
} catch (err) {
	console.log('\nMSTEST - Caught Exception:\n>>>>>\n' + err + '\n<<<<<\n');
}

