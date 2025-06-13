import { redirect, fail } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

export const load = async ({ cookies }) => {
	if (!cookies.get('token')) {
		redirect(302, '/login');
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const first_name = formData.get('first_name');
		const last_name = formData.get('last_name');

		const response = await fetch(`${API_BASE_URL}/job-application-request/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${cookies.get('token')}`
			},
			body: JSON.stringify({ email, first_name, last_name })
		});

		if (!response.ok) {
			return fail(400, { error: { message: 'An error occurred while creating the application' } });
		}

		const data = await response.json();

		console.log('Application created successfully:', data);

		return {
			status: 303,
			success: {
				message: 'Application created successfully! Please await it to be completed.'
			}
		};
	}
};
