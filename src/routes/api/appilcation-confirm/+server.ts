export const PATCH = async ({ url, cookies }) => {
	const token = cookies.get('token');
	const confirmationUrl = url.searchParams.get('confirmation_url');

	if (!confirmationUrl) {
		return new Response(JSON.stringify({ error: 'Confirmation URL is required' }), { status: 400 });
	}

	const response = await fetch(confirmationUrl, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		},
		body: JSON.stringify({ confirmed: true })
	});

	if (!response.ok) {
		return new Response(JSON.stringify({ error: 'Failed to confirm application' }), {
			status: 500
		});
	}

	const confirmation = await response.json();
	return new Response(JSON.stringify(confirmation), { status: 200 });
};
