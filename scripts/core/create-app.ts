import { CREATE_APPLICATION_ENDPOINT, EMAIL, FIRST_NAME, LAST_NAME } from '../config';

export const createApplication = async (token: string): Promise<string> => {
	const res = await fetch(CREATE_APPLICATION_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ email: EMAIL, first_name: FIRST_NAME, last_name: LAST_NAME })
	});

	if (!res.ok) throw new Error(`Create Application failed: ${res.statusText}`);
	const data = await res.json();
	console.log('Application created. Polling URL received.');
	return data.url;
};
