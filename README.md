# Wireless tools for Node.js

## Table of Contents
- [hostapd](#hostapd) - configure an access point
  - [hostapd.enable(options, callback)](#hostapdenableoptions-callback) - host an access point
  - [hostapd.disable(interface, callback)](#hostapddisableinterface-callback) - stop hosting an access point
- [ifconfig](#ifconfig) - configure network interfaces
  - [ifconfig.status(callback)](#ifconfigstatuscallback) - status of all network interfaces
  - [ifconfig.status(interface, callback)](#ifconfigstatusinterface-callback) - status of a network interface
  - [ifconfig.down(interface, callback)](#ifconfigdowninterface-callback) - take down a network interface
  - [ifconfig.up(options, callback)](#ifconfigupoptions-callback) - bring up a network interface
- [iwconfig](#iwconfig) - configure wireless network interfaces
  - [iwconfig.status(callback)](#iwconfigstatuscallback) - status of all wireless network interfaces
  - [iwconfig.status(interface, callback)](#iwconfigstatusinterface-callback) - status of a wireless network interface
- [iwlist](#iwlist) - query wireless network interfaces
  - [iwlist.scan(options, callback)](#iwlistscaninterface-callback) - scan for wireless networks
- [udhcpc](#udhcpc) - configure a dhcp client
  - [udhcpc.enable(options, callback)](#udhcpcenableoptions-callback) - start a dhcp client
  - [udhcpc.disable(interface, callback)](#udhcpcdisableinterface-callback) - stop a dhcp client
- [udhcpd](#udhcpd) - configure a dhcp server
  - [udhcpd.enable(options, callback)](#udhcpdenableoptions-callback) - start a dhcp server
  - [udhcpd.disable(interface, callback)](#udhcpddisableinterface-callback) - stop a dhcp server
- [wpa_cli](#wpa_cli) - send commands to wpa_supplicant using wpa_cli
  - [wpa_cli.add_network(interface, callback)](#wpa_cliadd_networkinterface-callback) - add network
  - [wpa_cli.bssid(interface, ap, ssid, callback)](#wpa_clibssidinterface-ap-ssid-callback) - set preferred bssid for ssid
  - [wpa_cli.disable_network(interface, id, callback)](#wpa_clidisable_networkinterface-id-callback) - disable network
  - [wpa_cli.disconnect(interface, callback)](#wpa_clidisconnectinterface-callback) - disconnect and wait for reassociate/reconnect command before connecting
  - [wpa_cli.enable_network(interface, id, callback)](#wpa_clienable_networkinterface-id-callback) - enable network
  - [wpa_cli.flush(interface, callback)](#wpa_cliflushinterface-callback) - flush wpa_supplicant state
  - [wpa_cli.reassociate(interface, callback)](#wpa_clireassociateinterface-callback) - tell wpa_supplicant to reassociate to an access point
  - [wpa_cli.reattach(interface, callback)](#wpa_clireattachinterface-callback) - force reassociation back to the same BSS
  - [wpa_cli.reauthenticate(interface, callback)](#wpa_clireauthenticateinterface-callback) - trigger IEEE 802.1X/EAPOL reauthentication
  - [wpa_cli.reconnect(interface, callback)](#wpa_clireconnectinterface-callback) - like reassociate, but only takes effect if already disconnected
  - [wpa_cli.remove_network(interface, id, callback)](#wpa_cliremove_networkinterface-id-callback) - remove network
  - [wpa_cli.save_config(interface, callback)](#wpa_clisave_configinterface-callback) - saves the current configuration
  - [wpa_cli.scan(interface, callback)](#wpa_cliscaninterface-callback) - new BSS scan
  - [wpa_cli.scan_results(interface, callback)](#wpa_cliscan_resultsinterface-callback) - results of latest BSS scan
  - [wpa_cli.select_network(interface, id, callback)](#wpa_cliselect_networkinterface-id-callback) - select network
  - [wpa_cli.set(interface, variable, value, callback)](#wpa_clisetinterface-variable-value-callback) - set variable to value
  - [wpa_cli.set_network(interface, id, variable, value, callback)](#wpa_cliset_networkinterface-id-variable-value-callback) - set network variables
  - [wpa_cli.status(interface, callback)](#wpa_clistatusinterface-callback) - get status of wpa
- [wpa_supplicant](#wpa_supplicant) - configure a wireless network connection
  - [wpa_supplicant.enable(options, callback)](#wpa_supplicantenableoptions-callback) - connect to a wireless network
  - [wpa_supplicant.disable(interface, callback)](#wpa_supplicantdisableinterface-callback) - disconnect from a wireless network
  - [wpa_supplicant.manual(options, callback)](#wpa_supplicantmanualoptions-callback) - start wpa_supplicant in a way it can receive commands from wpa_cli
- [iw](#iw) - get and set parameters using `iw`, the interface for nl80211 interfaces
  - [iw.scan(options, callback)](#iwscaninterface-callback) - scan for wireless networks


# hostapd
The **hostapd** command is used to configure wireless access points.

## hostapd.enable(options, callback)
The **hostapd enable** command is used to host an access point on a specific wireless interface.

``` javascript
const wt = require('wireless-tools');

const options = {
	channel   : 6,
	driver    : 'rtl871xdrv',
	hw_mode   : 'g',
	interface : 'wlan0',
	ssid      : 'RaspberryPi',

	wpa            : 2,
	wpa_passphrase : 'raspberry'
};

wt.hostapd.enable(options, error => {
	// the access point was created
});
```

## hostapd.disable(interface, callback)
The **hostapd disable** command is used to stop hosting an access point on a specific wireless interface.

``` javascript
const wt = require('wireless-tools');

wt.hostapd.disable('wlan0', error => {
	// no longer hosting the access point
});
```

# ifconfig
The **ifconfig** command is used to configure network interfaces.

## ifconfig.status(callback)
The **ifconfig status** command is used to query the status of all configured interfaces.

``` javascript
const wt = require('wireless-tools');

wt.ifconfig.status((error, status) => {
	console.log(status);
});

[
	{
		interface: 'eth0',
		link: 'ethernet',
		address: 'b8:27:eb:da:52:ad',
		ipv4_address: '192.168.1.2',
		ipv4_broadcast: '192.168.1.255',
		ipv4_subnet_mask: '255.255.255.0',
		up: true,
		broadcast: true,
		running: true,
		multicast: true
	},
	{
		interface: 'lo',
		link: 'local',
		ipv4_address: '127.0.0.1',
		ipv4_subnet_mask: '255.0.0.0',
		up: true,
		running: true,
		loopback: true
	},
	{
		interface: 'wlan0',
		link: 'ethernet',
		address: '00:0b:81:95:12:21',
		ipv4_address: '192.168.10.1',
		ipv4_broadcast: '192.168.10.255',
		ipv4_subnet_mask: '255.255.255.0',
		up: true,
		broadcast: true,
		multicast: true
	}
]
```

## ifconfig.status(interface, callback)
The **ifconfig interface status** command is used to query the status of a specific interface.

``` javascript
const wt = require('wireless-tools');

wt.ifconfig.status('eth0', (error, status) => {
	console.log(status);
});

{
	interface: 'eth0',
	link: 'ethernet',
	address: 'b8:27:eb:da:52:ad',
	ipv4_address: '192.168.1.2',
	ipv4_broadcast: '192.168.1.255',
	ipv4_subnet_mask: '255.255.255.0',
	up: true,
	broadcast: true,
	running: true,
	multicast: true
}
```

## ifconfig.down(interface, callback)
The **ifconfig down** command is used to take down an interface that is up.

``` javascript
const wt = require('wireless-tools');

wt.ifconfig.down('wlan0', error => {
	// the interface is down
});
```

## ifconfig.up(options, callback)
The **ifconfig up** command is used to bring up an interface with the specified configuration.

``` javascript
const wt = require('wireless-tools');

const options = {
	interface: 'wlan0',
	ipv4_address: '192.168.10.1',
	ipv4_broadcast: '192.168.10.255',
	ipv4_subnet_mask: '255.255.255.0'
};

wt.ifconfig.up(options, error => {
	// the interface is up
});
```

# iwconfig
The **iwconfig** command is used to configure wireless network interfaces.

## iwconfig.status(callback)
The **iwconfig status** command is used to query the status of all configured wireless interfaces.

``` javascript
const wt = require('wireless-tools');

wt.iwconfig.status((error, status) => {
	console.log(status);
});

[
	{
		interface: 'wlan0',
		access_point: '00:0b:81:95:12:21',
		frequency: 2.437,
		ieee: '802.11bg',
		mode: 'master',
		noise: 0,
		quality: 77,
		sensitivity: 0,
		signal: 50,
		ssid: 'RaspberryPi'
	},
	{
		interface: 'wlan1',
		frequency: 2.412,
		mode: 'auto',
		noise: 0,
		quality: 0,
		sensitivity: 0,
		signal: 0,
		unassociated: true
	}
]
```

## iwconfig.status(interface, callback)
The **iwconfig interface status** command is used to query the status of a specific wireless interface.

``` javascript
const wt = require('wireless-tools');

wt.iwconfig.status('wlan0', (error, status) => {
	console.log(status);
});

{
	interface: 'wlan0',
	access_point: '00:0b:81:95:12:21',
	frequency: 2.437,
	ieee: '802.11bg',
	mode: 'master',
	noise: 0,
	quality: 77,
	sensitivity: 0,
	signal: 50,
	ssid: 'RaspberryPi'
}
```

# iwlist
The **iwlist** command is used to get detailed information from a wireless interface.

## iwlist.scan(interface, callback)
The **iwlist scan** command is used to scan for wireless networks visible to a wireless interface. For convenience, the networks are sorted by signal strength.

``` javascript
const wt = require('wireless-tools');

wt.iwlist.scan('wlan0', (error, networks) => {
	console.log(networks);
});

wt.iwlist.scan({ iface : 'wlan0', show_hidden : true }, (error, networks) => {
	console.log(networks);
});

[
	{
		address: '00:0b:81:ab:14:22',
		ssid: 'BlueberryPi',
		mode: 'master',
		frequency: 2.437,
		channel: 6,
		security: 'wpa',
		quality: 48,
		signal: 87
	},
	{
		address: '00:0b:81:95:12:21',
		ssid: 'RaspberryPi',
		mode: 'master',
		frequency: 2.437,
		channel: 6,
		security: 'wpa2',
		quality: 58,
		signal: 83
	},
	{
		address: '00:0b:81:cd:f2:04',
		ssid: 'BlackberryPi',
		mode: 'master',
		frequency: 2.437,
		channel: 6,
		security: 'wep',
		quality: 48,
		signal: 80
	},
	{
		address: '00:0b:81:fd:42:14',
		ssid: 'CranberryPi',
		mode: 'master',
		frequency: 2.437,
		channel: 6,
		security: 'open',
		quality: 32,
		signal: 71
	}
]

[
	{
		address: '00:0b:81:ab:14:22',
		ssid: 'BlueberryPi',
		mode: 'master',
		frequency: 2.437,
		channel: 6,
		security: 'wpa',
		quality: 48,
		signal: 87
	},
	{
		address: '00:0b:81:95:12:21',
		ssid: 'RaspberryPi',
		mode: 'master',
		frequency: 2.437,
		channel: 6,
		security: 'wpa2',
		quality: 58,
		signal: 83
	},
	{
		address: '00:0b:81:cd:f2:04',
		ssid: 'BlackberryPi',
		mode: 'master',
		frequency: 2.437,
		channel: 6,
		security: 'wep',
		quality: 48,
		signal: 80
	},
	{
		address: '00:0b:81:fd:42:14',
		ssid: 'CranberryPi',
		mode: 'master',
		frequency: 2.437,
		channel: 6,
		security: 'open',
		quality: 32,
		signal: 71
	},
	{
		address: '2c:c5:d3:02:ae:4c',
		channel: 100,
		frequency: 5.5,
		mode: 'master',
		quality: 66,
		signal: -44,
		security: 'wpa2'
	}
]
```

# udhcpc
The **udhcpc** command is used to configure a dhcp client for a network interface.

## udhcpc.enable(options, callback)
The **udhcpc enable** command is used to start a dhcp client on a specific network interface.

``` javascript
const wt = require('wireless-tools');

const options = {
	interface: 'wlan0'
};

wt.udhcpc.enable(options, error => {
	// the dhcp client was started
});
```

## udhcpc.disable(interface, callback)
The **udhcpc disable** command is used to stop a dhcp client on a specific network interface.

``` javascript
const wt = require('wireless-tools');

wt.udhcpc.disable('wlan0', error => {
	// the dhcp client was stopped
});
```

# udhcpd
The **udhcpd** command is used to configure a dhcp server for a network interface.

## udhcpd.enable(options, callback)
The **udhcpd enable** command is used to start a dhcp server on a specific network interface.

``` javascript
const wt = require('wireless-tools');

const options = {
	interface: 'wlan0',
	start: '192.168.10.100',
	end: '192.168.10.200',

	option: {
		router: '192.168.10.1',
		subnet: '255.255.255.0',
		dns: [ '4.4.4.4', '8.8.8.8' ]
	}
};

wt.udhcpd.enable(options, error => {
	// the dhcp server was started
});
```

## udhcpd.disable(interface, callback)
The **udhcpd disable** command is used to stop a dhcp server on a specific network interface.

``` javascript
const wt = require('wireless-tools');

wt.udhcpd.disable('wlan0', error => {
	// the dhcp server was stopped
});
```

# wpa_cli
The **wpa_cli** command is used to setup what wpa_supplicant must do to connect to a wireless network connection for a network interface.

Most of wpa_cli commands return either 'OK' or 'FAIL' (and the exit status is
always 0). Because of this, all 'FAIL' responses will return and callback with an error.

Responses containing an 'OK' result only means than wpa_supplicant had received
the command. You must poll wpa_supplicant (or other commands like iwconfig) to be sure that the command was actually applied by wpa_supplicant.

## wpa_cli.status(interface, callback)
The **wpa_cli status** command is used to get the current status of wpa_supplicant on a specific network interface.

``` javascript
const wt = require('wireless-tools');

wt.wpa_cli.status('wlan0', (error, status) => {
	console.dir(status);
});
```

``` javascript
{
	bssid: '2c:f5:d3:02:ea:d9',
	frequency: 2412,
	mode: 'station',
	key_mgmt: 'wpa2-psk',
	ssid: 'Fake-Wifi',
	pairwise_cipher: 'CCMP',
	group_cipher: 'CCMP',
	p2p_device_address: 'e4:28:9c:a8:53:72',
	wpa_state: 'COMPLETED',
	ip: '10.34.141.168',
	mac: 'e4:28:9c:a8:53:72',
	uuid: 'e1cda789-8c88-53e8-ffff-31c304580c1e',
	id: 0
}
```
## wpa_cli.bssid(interface, ap, ssid, callback)
The **wpa_cli bssid** command is used to set the preferred access points for an specific ssid on a specific network interface.

``` javascript
const wt = require('wireless-tools');

wt.wpa_cli.bssid('wlan0', '2c:f5:d3:02:ea:dd', 'Fake-Wifi', (error, data) => {
	// this is correct usage
	console.dir(data);
});
```
## wpa_cli.reassociate(interface, callback)
The **wpa_cli reassociate** command is used to instruct wpa_supplicant to reassociate to access points for an SSID on a specific network interface.

``` javascript
const wt = require('wireless-tools');

wt.wpa_cli.bssid('wlan0', 'Fake-Wifi', '2c:f5:d3:02:ea:dd', (error, data) => {
	// our usage is wrong so an error is triggered
	if (error) {
		console.dir(error);

		// attempt to reassociate
		wpa_cli.reassociate('wlan0', (error, data) => {
			console.dir(data);
		});
	}
});

```
## wpa_cli.reattach(interface, callback)
The **wpa_cli reattach** command is used to force reassociation back to the same BSS on a specific network interface.

## wpa_cli.disconnect(interface, callback)
The **wpa_cli disconnect** command is used to disconnect and wait for reassociate/reconnect command before connecting on a specific network interface.

## wpa_cli.reconnect(interface, callback)
The **wpa_cli reconnect** command is used like reassociate, but only takes effect if already disconnected.

## wpa_cli.reauthenticate(interface, callback)
The **wpa_cli reauthenticate** command is used to trigger IEEE 802.1X/EAPOL reauthentication on a specific network interface.

## wpa_cli.set(interface, variable, value, callback)
The **wpa_cli set** command is used to set wpa_supplicant parameters to a value on a specific network interface.

## wpa_cli.add_network(interface, callback)
The **wpa_cli add_network** command is used to create a new network entry on a specific network interface.
It will return on success the id of the new network

## wpa_cli.set_network(interface, id, variable, value, callback)
The **wpa_cli set_network** command is used to set variables for a network on a specific network interface.

## wpa_cli.enable_network(interface, id, callback)
The **wpa_cli enable_network** command is used to enable a network on a specific network interface.

## wpa_cli.disable_network(interface, id, callback)
The **wpa_cli disable_network** command is used to disable a network on a specific network interface.

## wpa_cli.remove_network(interface, id, callback)
The **wpa_cli remove_network** command is used to remove a network on a specific network interface.

## wpa_cli.select_network(interface, id, callback)
The **wpa_cli select_network** command is used to select a specific network on a specific network interface and
disable all others.

``` javascript
const wt = require('wireless-tools');

wt.wpa_cli.select_network('wlan0', 0, (error, data) => {
	if (error) {
		// most likely the set values for the specified id are wrong
		console.error(error);
		return;
	}

	// successfully connected to the new network
	console.dir(data);
});
```
## wpa_cli.scan(interface, callback)
The **wpa_cli scan** is used to request a new BSS scan on a specific network interface.

## wpa_cli.scan_results(interface, callback)
The **wpa_cli scan_results** is used to return the results of the latest BSS scan
 that was run on a specific network interface.

``` javascript
const wt = require('wireless-tools');

wt.wpa_cli.scan('wlan0', (error, data) => {
	wpa_cli.scan_results('wlan0', (error, data) => {
		// returns the results of the BSS scan once it completes
		console.dir(data);
	}
});
```

``` javascript
[
 {
	bssid: '2c:f5:d3:02:ea:d9',
	frequency: 2472,
	signalLevel: -31,
	flags: '[WPA-PSK-CCMP+TKIP][WPA2-PSK-CCMP+TKIP][ESS]',
	ssid: 'FakeWifi'
 },
 {
	bssid: '2c:f5:d3:02:ea:d9',
	frequency: 2472,
	signalLevel: -31,
	flags: '[WPA-PSK-CCMP+TKIP][WPA2-PSK-CCMP+TKIP][ESS]',
	ssid: 'FakeWifi2'
 }
]
```

## wpa_cli.save_config(interface, callback)
The **wpa_cli save_config** command is used to save the current wpa_cli configuration for the specific network interface.

``` javascript
const wt = require('wireless-tools');

wt.wpa_cli.save_config('wlan0', (error, data) => {
	// current wpa_cli configuration is saved
});
```

## wpa_cli.flush(interface, callback)
The **wpa_cli flush** command is used to flush wpa_supplicant state on a specific network interface.

# wpa_supplicant
The **wpa_supplicant** command is used to configure a wireless network connection for a network interface.

## wpa_supplicant.enable(options, callback)
The **wpa_supplicant enable** command is used to join a wireless network on a specific network interface.

``` javascript
const wt = require('wireless-tools');

const options = {
	interface: 'wlan0',
	ssid: 'RaspberryPi',
	passphrase: 'raspberry',
	driver: 'wext'
};

wt.wpa_supplicant.enable(options, error => {
	// connected to the wireless network
});
```

## wpa_supplicant.disable(interface, callback)
The **wpa_supplicant disable** command is used to disconnect from a wireless network on a specific network interface.

``` javascript
const wt = require('wireless-tools');

wt.wpa_supplicant.disable('wlan0', error => {
	// disconnected from wireless network
});
```

## wpa_supplicant.manual(options, callback)
The **wpa_supplicant manual** command is used to launch wpa_supplicant on a specific network interface.

``` javascript
const wt = require('wireless-tools');

const options = {
	interface : 'wlan0',
	drivers   : [ 'nl80211', 'wext' ]
};

wt.wpa_supplicant.manual(options, error => {
	// wpa_supplicant launched on wlan0 interface (can be setup using wpa_cli)
});
```

# iw
The **iw** command is used to get and set detailed information from an nl80211 wireless interface.

## iw.scan(interface, callback)
The **iw scan** command is used to scan for wireless networks visible to a wireless interface. For convenience, the networks are sorted by signal strength.

``` javascript
const wt = require('wireless-tools');

wt.iw.scan('wlan0', (error, networks) => {
	console.log(networks);
});

wt.iw.scan({ iface : 'wlan0', show_hidden : true }, (error, networks) => {
	console.log(networks);
});

[
	{
		address: '00:0b:81:ab:14:22',
		frequency: 2422,
		signal: -80,
		lastSeenMs: 0,
		ssid: 'BlueberryPi',
		channel: 3,
		security: 'wpa'
	},
	{
		address: '00:0b:81:95:12:21',
		frequency: 5825,
		signal: -83,
		lastSeenMs: 2031,
		ssid: 'RaspberryPi',
		channel: 165,
		security: 'wpa2'
	},
	{
		address: '00:0b:81:cd:f2:04',
		frequency: 2437,
		signal: -88,
		lastSeenMs: 0,
		ssid: 'BlackberryPi',
		channel: 6,
		security: 'wep'
	},
	{
		address: '00:0b:81:fd:42:14',
		frequency: 2412,
		signal: -92,
		lastSeenMs: 0,
		ssid: 'CranberryPi',
		channel: 1,
		security: 'open'
	}
]

[
	{
		address: '00:0b:81:ab:14:22',
		frequency: 2422,
		signal: -80,
		lastSeenMs: 0,
		ssid: 'BlueberryPi',
		channel: 3,
		security: 'wpa'
	},
	{
		address: '00:0b:81:95:12:21',
		frequency: 5825,
		signal: -83,
		lastSeenMs: 2031,
		ssid: 'RaspberryPi',
		channel: 165,
		security: 'wpa2'
	},
	{
		address: '00:0b:81:cd:f2:04',
		frequency: 2437,
		signal: -88,
		lastSeenMs: 0,
		ssid: 'BlackberryPi',
		channel: 6,
		security: 'wep'
	},
	{
		address: '00:0b:81:fd:42:14',
		frequency: 2412,
		signal: -92,
		lastSeenMs: 0,
		ssid: 'CranberryPi',
		channel: 1,
		security: 'open'
	},
	{
		address: '00:0b:81:fd:42:01',
		frequency: 2412,
		signal: -94,
		lastSeenMs: 1069,
		channel: 1,
		security: 'open'
	}
]
```
