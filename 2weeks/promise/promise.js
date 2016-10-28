function task1(fullfill, reject) {
	console.log('Task1 시작');
	setTimeout(function() {
		console.log('Task1 끝');
		fullfill('Task1 결과');
		//reject('Error msg');
	}, 5000);
}

function fullfilled(result) {
	console.log('fullfilled : ', result);
}

function rejected(err) {
	console.log('rejected : ', err);
}

new Promise(task1).then(fullfilled, rejected);