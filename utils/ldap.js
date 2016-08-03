import ldap from 'ldapjs';
import baseConfig from '../config/base.config.js';

const ldapurl = baseConfig.ldap.use ? baseConfig.ldap.url : '';
const username = baseConfig.ldap.use ? baseConfig.ldap.username : '';
const password = baseConfig.ldap.use ? baseConfig.ldap.password : '';

export default (callback) => {
	return new Promise((resolve, reject) => {
		let client = ldap.createClient({
			url: ldapurl,
			timeout: 5000,
			connectTimeout: 10000
		});
		client.bind(username, password, (err) => {
			if (err) {
				reject(err);
			} else {
				callback(client, resolve, reject);
			}
		});
	});
};
