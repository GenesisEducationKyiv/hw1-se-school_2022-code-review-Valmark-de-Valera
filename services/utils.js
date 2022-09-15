function validateEmail(email) {
	let regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

function isExpireBySeconds(date, secondsToExpire) {
	let today = new Date();
	return today.getTime() >= date.getTime() + secondsToExpire * 1000;
}

module.exports = { validateEmail, isExpireBySeconds };
