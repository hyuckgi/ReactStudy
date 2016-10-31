function task1(callback) {
	console.log('Task1 시작');
	setTimeout(function() {
		console.log('Task1 끝');
		callback('Error', null);
	}, 5000);
}


function task2(callback) {
	console.log('Task2 시작');
	setTimeout(function() {
		console.log('Task2 끝');
		callback(null, 'Task2 결과');
	}, 200);
}

var async = require('async');
async.series([task1, task2], function(err, results) {
	if ( err ) {
		console.error('Error : ', err);
		return;
	}
	console.log('비동기 동작 모두 종료 ', results)
});
