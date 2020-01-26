#!/usr/bin/env node

const wt = require('./');


wt.ifconfig.status((error, status) => {
	if (error) {
		console.error('ifconfig error: %o', error);
		return;
	}

	console.log('ifconfig status: %o', status);
});

wt.iwconfig.status((error, status) => {
	if (error) {
		console.error('iwconfig error: %o', error);
		return;
	}

	console.log('iwconfig status: %o', status);
});
