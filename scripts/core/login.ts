import { LOGIN_ENDPOINT, USERNAME, PASSWORD } from '../config';

export const login = async (): Promise<string> => {
	const res = await fetch(LOGIN_ENDPOINT, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username: USERNAME, password: PASSWORD })
	});

	if (!res.ok) throw new Error(`Login failed: ${res.statusText}`);
	const data = await res.json();
	console.log('Logged in. Token received.');

	return data.token;
};
