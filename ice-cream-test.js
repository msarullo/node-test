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
	console.log(err.stack);
	console.log('<<<<<');
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
		if (err) {
			console.log('MSTEST - ICE all playlists PROBLEM:');
			console.log('MSTEST - err:\n>>>>>');
			console.log(err);
			console.log('<<<<<');
			console.log('MSTEST - playlistData:\n>>>>>');
			console.log(playlistData);
			console.log('<<<<<');
		} else {
			console.log('MSTEST - Received %d playlists, with %d listed as primary', Object.keys(playlistData.plst_all).length, playlistData.plst_primary.length);
			
			// get info for the primary play lists
			console.log('MSTEST - Requesting data for each primary playlist...');
			for (var idx=0, max=playlistData.plst_primary.length; idx < max; ++idx) {
				primaryPlist = playlistData.plst_primary[idx];
				primaryPlistId = parseInt(primaryPlist.knews_id, 10);

				console.log('MSTEST - Requesting data for playlist:  %d', primaryPlistId);
				ice.playlist.getById(primaryPlistId, function(err, playlistData){
					console.log('MSTEST - Playlist data:');
					if (err) {
						console.log('MSTEST - err:\n>>>>>');
						console.log(err.stack);
						console.log('<<<<<');
					} else {
						console.log('MSTEST - playlistData: ID(%d), NAME(%s), VIDEO COUNT(%d)', playlistData.id, playlistData.display_name, playlistData.videos.length);
						var maxIdx = playlistData.videos.length > 5 ? 5 : playlistData.videos.length;
						for (var idx = 0; idx < maxIdx; ++idx) {
							console.log('MSTEST - playlist (%s) video: ID (%d), HEADLINE (%s)', playlistData.display_name, playlistData.videos[idx].id, playlistData.videos[idx].headline);
						}
						
//						console.log('MSTEST - playlistData:\n>>>>>');
//						console.log(playlistData);
//						console.log('<<<<<');
					}
				})
			}
		}
	});
} catch (err) {
	console.log('\nMSTEST - Caught Exception:\n>>>>>\n' + err + '\n<<<<<\n');
}

