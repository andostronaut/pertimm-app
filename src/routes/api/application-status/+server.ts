export const GET = async ({ url, cookies }) => {
	const token = cookies.get('token');
	const applicationUrl = url.searchParams.get('application_url');

	if (!applicationUrl) {
		return new Response(JSON.stringify({ error: 'Application URL is required' }), { status: 400 });
	}

	const response = await fetch(applicationUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		}
	});

	if (!response.ok) {
		return new Response(JSON.stringify({ error: 'Failed to get status' }), { status: 500 });
	}

	const status = await response.json();
	return new Response(JSON.stringify({ status: status.status }), { status: 200 });
};
