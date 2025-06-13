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

		const application = await response.json();

		if (application && application.url) {
			setInterval(async () => {
				const response = await fetch(application.url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Token ${cookies.get('token')}`
					}
				});

				if (!response.ok) {
					return fail(400, {
						error: { message: 'An error occurred while completing the application' }
					});
				}

				const status = await response.json();

				if (status.status === 'COMPLETED') {
					clearInterval(this);

					if (status && status.confirmation_url) {
						const confirmation = await fetch(status.confirmation_url, {
							method: 'PATCH',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Token ${cookies.get('token')}`
							},
							body: JSON.stringify({ confirmed: true })
						});

						if (!confirmation.ok) {
							return fail(400, {
								error: { message: 'An error occurred while confirming the application' }
							});
						}

						const confirmationResult = await confirmation.json();

						if (confirmationResult && confirmationResult.confirmed) {
							return {
								status: 303,
								success: { message: 'Application confirmed successfully!' }
							};
						}
					}
				} else {
					return {
						status: 303,
						success: { message: 'Application is still in progress. Please check back later.' }
					};
				}
			}, 1000);
		}

		return {
			status: 303,
			success: {
				message: 'Application created successfully! Please await it to be completed.'
			}
		};
	}
};
