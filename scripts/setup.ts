import { login } from './core/login';
import { createApplication } from './core/create-app';
import { pollStatus } from './core/poll-status';
import { confirmApplication } from './core/confirm-app';

const main = async (): Promise<void> => {
	try {
		const token = await login();
		const statusUrl = await createApplication(token);
		const confirmationUrl = await pollStatus(token, statusUrl);
		await confirmApplication(token, confirmationUrl);
	} catch (error) {
		console.error('Error:', error);
	}
};

main();
