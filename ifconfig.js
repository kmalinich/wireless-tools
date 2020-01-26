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
 * Parses the status for a single NIC
 *
 * @private
 * @static
 * @category ifconfig
 * @param {string} block The section of stdout for the NIC
 * @returns {object} The parsed NIC status
 */
function parse_status_block(block) {
	let match;

	const parsed = {
		nic : block.match(/^([^\s^:]+)/)[1],
	};

	if ((match = block.match(/Link encap:\s*([^\s]+)/))) {
		parsed.link = match[1].toLowerCase();
	}

	if (!parsed.link && (match = block.match(/ether[^(]*\(([^\s]+)\)/))) {
		parsed.link = match[1].toLowerCase();
	}

	if (!parsed.link && (match = block.match(/loop[^(]*\(([^\s]+)/))) {
		parsed.link = match[1].toLowerCase();
	}

	if ((match = block.match(/HWaddr\s+([^\s]+)/))) {
		parsed.address = match[1].toLowerCase();
	}

	if (!parsed.address && (match = block.match(/ether\s*([^\s]+)/))) {
		parsed.address = match[1].toLowerCase();
	}

	if ((match = block.match(/inet6\s+addr:\s*([^\s]+)/))) {
		parsed.ipv6_address = match[1];
	}

	if (!parsed.address && (match = block.match(/ether\s*([^\s]+)/))) {
		parsed.address = match[1].toLowerCase();
	}

	if ((match = block.match(/inet\s+addr:\s*([^\s]+)/))) {
		parsed.ipv4_address = match[1];
	}

	if (!parsed.ipv4_address && (match = block.match(/inet\s+([^\s]+)/))) {
		parsed.ipv4_address = match[1];
	}

	if ((match = block.match(/Bcast:\s*([^\s]+)/))) {
		parsed.ipv4_broadcast = match[1];
	}

	if (!parsed.ipv4_broadcast && (match = block.match(/broadcast\s*([^\s]+)/))) {
		parsed.ipv4_broadcast = match[1];
	}

	if ((match = block.match(/Mask:\s*([^\s]+)/))) {
		parsed.ipv4_subnet_mask = match[1];
	}

	if (!parsed.ipv4_subnet_mask && (match = block.match(/netmask\s*([^\s]+)/))) {
		parsed.ipv4_subnet_mask = match[1];
	}

	if ((match = block.match(/BROADCAST/))) parsed.broadcast = true;
	if ((match = block.match(/LOOPBACK/)))  parsed.loopback  = true;
	if ((match = block.match(/MULTICAST/))) parsed.multicast = true;
	if ((match = block.match(/RUNNING/)))   parsed.running   = true;
	if ((match = block.match(/UP/)))        parsed.up        = true;

	return parsed;
}

/**
 * Parses the status for all NICs
 *
 * @private
 * @static
 * @category ifconfig
 * @param {function} callback The callback function
 */
function parse_status(callback) {
	return function (error, stdout) {
		if (error) { callback(error); return; }

		callback(error, stdout.trim().split('\n\n').map(parse_status_block));
	};
}

/**
 * Parses the status for a single NIC
 *
 * @private
 * @static
 * @category ifconfig
 * @param {function} callback The callback function
 */
function parse_status_nic(callback) {
	return function (error, stdout) {
		if (error) { callback(error); return; }

		callback(error, parse_status_block(stdout.trim()));
	};
}

/**
 * The **ifconfig status** command is used to query the status of all configured NICs
 *
 * @static
 * @category ifconfig
 * @param {string} [nic] The NIC
 * @param {function} callback The callback function
 */
function status(nic, callback) {
	if (callback) {
		this.exec('ifconfig ' + nic, parse_status_nic(callback));
		return;
	}

	this.exec('ifconfig -a', parse_status(nic));
}

/**
 * The **ifconfig down** command is used to take down a NIC that is up
 *
 * @static
 * @category ifconfig
 * @param {string} the NIC
 * @param {function} callback The callback function
 * @returns {process} The child process
 */
function down(nic, callback) {
	return this.exec('ifconfig ' + nic + ' down', callback);
}

/**
 * The **ifconfig up** command is used to bring up a NIC with the
 * specified configuration
 *
 * @static
 * @category ifconfig
 * @param {object} options The NIC configuration
 * @param {function} callback The callback function
 * @returns {process} The child process
 */
function up(options, callback) {
	return this.exec('ifconfig ' + options.nic +    ' ' + options.ipv4_address +    ' netmask ' + options.ipv4_subnet_mask +    ' broadcast ' + options.ipv4_broadcast +    ' up', callback);
}


/**
 * The **ifconfig** command is used to configure NICs
 *
 * @static
 * @category ifconfig
 */
module.exports = {
	exec : child_process.exec,
	status,
	down,
	up,
};
