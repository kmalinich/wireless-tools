/*
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

const child_process = require('child_process');

/**
 * The **iwconfig** command is used to configure wireless network interfaces.
 *
 * @private
 * @category iwconfig
 *
 */
module.exports = {
	exec : child_process.exec,
	status,
};


// Convert WiFi frequency into channel number
function freq2channel(freq) {
	switch (freq) {
		case 2.412 : return 1;
		case 2.417 : return 2;
		case 2.422 : return 3;
		case 2.427 : return 4;
		case 2.432 : return 5;
		case 2.437 : return 6;
		case 2.442 : return 7;
		case 2.447 : return 8;
		case 2.452 : return 9;
		case 2.457 : return 10;
		case 2.462 : return 11;
		case 2.467 : return 12;
		case 2.472 : return 13;
		case 2.484 : return 14;
	}
}

/**
 * Parses the status for a single wireless network interface.
 *
 * @private
 * @static
 * @category iwconfig
 * @param {string} block The section of stdout for the interface.
 * @returns {object} The parsed wireless network interface status.
 *
 */
function parse_status_block(block) {
	let match;

	// Skip out of the block is invalid
	if (!block) return;

	const parsed = {
		interface : block.match(/^([^\s]+)/)[1],
	};

	if ((match = block.match(/Access Point:\s*([A-Fa-f0-9:]{17})/))) parsed.access_point     = match[1].toLowerCase();
	if ((match = block.match(/Bit Rate[:|=]\s*([0-9.]+)/)))          parsed.bitrate          = parseFloat(match[1]);
	if ((match = block.match(/Frequency[:|=]\s*([0-9.]+)/)))         parsed.frequency        = parseFloat(match[1]);
	if ((match = block.match(/IEEE\s*([^\s]+)/)))                    parsed.ieee             = match[1].toLowerCase();
	if ((match = block.match(/Mode[:|=]\s*([^\s]+)/)))               parsed.mode             = match[1].toLowerCase();
	if ((match = block.match(/Noise level[:|=]\s*(-?[0-9]+)/)))      parsed.noise            = parseInt(match[1], 10);
	if ((match = block.match(/Power Management[:|=]\s*(-?[0-9]+)/))) parsed.power_management = (match[1] === 'on');
	if ((match = block.match(/Link Quality[:|=]\s*([0-9]+)/)))       parsed.quality          = parseInt(match[1], 10);
	if ((match = block.match(/Sensitivity[:|=]\s*([0-9]+)/)))        parsed.sensitivity      = parseInt(match[1], 10);
	if ((match = block.match(/Signal level[:|=]\s*(-?[0-9]+)/)))     parsed.signal           = parseInt(match[1], 10);
	if ((match = block.match(/ESSID[:|=]\s*"([^"]+)"/)))             parsed.ssid             = match[1];
	if ((match = block.match(/unassociated/)))                       parsed.unassociated     = true;

	if (parsed.frequency) parsed.channel = freq2channel(parsed.frequency);

	return parsed;
}

/**
 * Parses the status for all wireless network interfaces.
 *
 * @private
 * @static
 * @category iwconfig
 * @param {function} callback The callback function.
 *
 */
function parse_status(callback) {
	return function (error, stdout) {
		if (error) callback(error);
		else {
			callback(error, stdout.trim().replace(/ {10,}/g, '').split('\n\n')
				.map(parse_status_block)
				.filter((i) => !!i));
		}
	};
}

/**
 * Parses the status for a single wireless network interface.
 *
 * @private
 * @static
 * @category iwconfig
 * @param {function} callback The callback function.
 *
 */
function parse_status_interface(callback) {
	return function (error, stdout) {
		if (error) callback(error);
		else callback(error, parse_status_block(stdout.trim()));
	};
}

/**
 * Parses the status for a single wireless network interface.
 *
 * @private
 * @static
 * @category iwconfig
 * @param {string} [interface] The wireless network interface.
 * @param {function} callback The callback function.
 * @example
 *
 * var iwconfig = require('wireless-tools/iwconfig');
 *
 * iwconfig.status(function(err, status) {
 *   console.log(status);
 * });
 *
 * // =>
 * [
 *   {
 *     interface: 'wlan0',
 *     access_point: '00:0b:81:95:12:21',
 *     frequency: 2.437,
 *     ieee: '802.11bg',
 *     mode: 'master',
 *     noise: 0,
 *     quality: 77,
 *     sensitivity: 0,
 *     signal: 50,
 *     ssid: 'RaspberryPi'
 *   },
 *   {
 *     interface: 'wlan1',
 *     frequency: 2.412,
 *     mode: 'auto',
 *     noise: 0,
 *     quality: 0,
 *     sensitivity: 0,
 *     signal: 0,
 *     unassociated: true
 *   }
 * ]
 *
 */
function status(interface, callback) {
	if (callback) {
		return this.exec('iwconfig ' + interface,
			parse_status_interface(callback));
	}

	return this.exec('iwconfig', parse_status(interface));
}
