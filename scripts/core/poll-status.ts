export const pollStatus = async (token: string, statusUrl: string): Promise<string> => {
	const pollInterval = 2000; // 2 sec
	const timeout = 25000; // 25 sec limit

	const start = Date.now();

	return new Promise((resolve, reject) => {
		const interval = setInterval(async () => {
			if (Date.now() - start > timeout) {
				clearInterval(interval);
				return reject(new Error('Polling timeout exceeded'));
			}

			try {
				const res = await fetch(statusUrl, {
					headers: { Authorization: `Bearer ${token}` }
				});

				if (!res.ok) throw new Error(`Polling failed: ${res.statusText}`);

				const data = await res.json();
				console.log(`Current status: ${data.status}`);

				if (data.status === 'COMPLETED') {
					clearInterval(interval);
					resolve(data.confirmation_url);
				}
			} catch (err) {
				clearInterval(interval);
				reject(err);
			}
		}, pollInterval);
	});
};
