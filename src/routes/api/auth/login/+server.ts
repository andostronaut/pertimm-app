import { API_BASE_URL } from '$env/static/private';

export const POST = async ({ cookies, request }) => {
	const body = await request.json();

	const response = await fetch(`${API_BASE_URL}/auth/login/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		return new Response(JSON.stringify({ error: { message: 'An error occurred during login' } }), {
			status: 400
		});
	}

	const data = await response.json();
	cookies.set('token', data.token, { path: '/', httpOnly: true });

	return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
};
