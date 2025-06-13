export const getAuthToken = (): string | null => {
	if (typeof document === 'undefined') return null;

	return (
		document.cookie
			.split('; ')
			.find((row) => row.startsWith('token='))
			?.split('=')[1] || null
	);
};

export const createAuthHeaders = (): Record<string, string> => {
	const token = getAuthToken();

	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	if (token) {
		headers['Authorization'] = `Token ${token}`;
	}

	return headers;
};
