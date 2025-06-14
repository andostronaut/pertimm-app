import { API_BASE_URL } from '$env/static/private';

export const POST = async ({ cookies, request }) => {
	const token = cookies.get('token');
	const body = await request.json();

	const response = await fetch(`${API_BASE_URL}/job-application-request/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`
		},
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		return new Response(
			JSON.stringify({ error: { message: 'An error occurred while creating the application' } }),
			{ status: 400 }
		);
	}

	const application = await response.json();
	return new Response(JSON.stringify(application), { status: 200 });
};
