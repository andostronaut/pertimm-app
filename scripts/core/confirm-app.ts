export const confirmApplication = async (token: string, confirmationUrl: string): Promise<void> => {
	const res = await fetch(confirmationUrl, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ confirmed: true })
	});

	if (!res.ok) throw new Error(`Confirmation failed: ${res.statusText}`);
	console.log('Application confirmed successfully!');
};
