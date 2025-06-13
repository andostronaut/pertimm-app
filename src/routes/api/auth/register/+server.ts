import { API_BASE_URL } from '$env/static/private';

export const POST = async ({ request }) => {
	const body = await request.json();

	const response = await fetch(`${API_BASE_URL}/auth/register/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		return new Response(
			JSON.stringify({ error: { message: 'An error occurred during registration' } }),
			{
				status: 400
			}
		);
	}

	return new Response(JSON.stringify({ message: 'Registration successful' }), { status: 200 });
};
