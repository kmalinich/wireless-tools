#!/usr/bin/env node

const wtools = require('./');

wtools.ifconfig.status('wlan0', (error, status) => {
	if (error) {
		console.error(error);
		return;
	}

	console.log(status);
});

wtools.iwconfig.status('wlan0', (error, status) => {
	if (error) {
		console.error(error);
		return;
	}

	console.log(status);
});
