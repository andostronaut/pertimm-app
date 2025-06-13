import { redirect, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password1 = formData.get('password1');
		const password2 = formData.get('password2');

		if (password1 !== password2) {
			return fail(400, { error: { message: 'Passwords do not match' } });
		}

		const response = await fetch(`${API_BASE_URL}/auth/register/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password1, password2 })
		});

		if (!response.ok) {
			return fail(400, { error: { message: 'An error occurred during registration' } });
		}

		redirect(303, '/login');
	}
};
