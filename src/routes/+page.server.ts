import { redirect, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

export const load = async ({ cookies }) => {
	if (!cookies.get('token')) {
		redirect(302, '/login');
	}
};

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const first_name = formData.get('first_name');
		const last_name = formData.get('last_name');

		const response = await fetch(`${API_BASE_URL}/job-application-request/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, first_name, last_name })
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			return fail(400, { message: errorData.message || 'Application request failed' });
		}

		redirect(200, '/');
	}
};
