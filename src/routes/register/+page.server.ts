import { redirect, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password1 = formData.get('password1');
		const password2 = formData.get('password2');

		console.log({ email, password1, password2 });

		if (password1 !== password2) {
			return fail(400, { message: "Passwords don't match" });
		}

		const response = await fetch(`${API_BASE_URL}/register/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password1, password2 })
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return fail(400, { message: errorData.message || 'Registration failed' });
		}

		redirect(200, '/login');
	}
};
