const API_BASE_URL = 'https://hire-game.pertimm.dev/api/v1.1';

export async function login(email: string, password: string) {
	const response = await fetch(`${API_BASE_URL}/login/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || 'Login failed');
	}

	return response.json();
}

export async function register(email: string, password: string) {
	const response = await fetch(`${API_BASE_URL}/register/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || 'Registration failed');
	}

	return response.json();
}

export async function createApplication(data: {
	email: string;
	first_name: string;
	last_name: string;
}) {
	const response = await fetch(`${API_BASE_URL}/job-application-request/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || 'Application creation failed');
	}

	return response.json();
}
