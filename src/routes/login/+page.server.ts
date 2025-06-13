import { redirect, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		const response = await fetch(`${API_BASE_URL}/auth/login/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (!response.ok) {
			return fail(400, { error: { message: 'An error occurred during login' } });
		}

		const data = await response.json();
		cookies.set('token', data.token, { path: '/', httpOnly: true });

		redirect(303, '/');
	}
};
