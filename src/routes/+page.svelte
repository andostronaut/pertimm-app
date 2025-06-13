<script lang="ts">
	let message = $state('');

	let email = $state('');
	let firstName = $state('');
	let lastName = $state('');

	let applicationUrl = $state('');
	let confirmationUrl = $state('');

	let postApplicationRequestLoading = $state(false);
	let getApplicationStatusLoading = $state(false);
	let patchApplicationConfirmLoading = $state(false);

	let interval: ReturnType<typeof setInterval>;

	const postApplicationRequest = async () => {
		postApplicationRequestLoading = true;

		const app = {
			email: email,
			first_name: firstName,
			last_name: lastName
		};

		const postApplication = await fetch('/api/applications/request', {
			method: 'POST',
			body: JSON.stringify(app)
		});

		const application = await postApplication.json();

		if (application && application.url) {
			applicationUrl = application.url;
			message = 'Application created successfully! Please wait for confirmation.';
			postApplicationRequestLoading = false;

			interval = setInterval(async () => {
				await getApplicationStatus(application.url);
			}, 1000);
		}
	};

	const getApplicationStatus = async (applicationUrl: string) => {
		if (applicationUrl) {
			getApplicationStatusLoading = true;

			const applicationUrlEncoded = encodeURIComponent(applicationUrl);
			const fetchStatus = await fetch(
				`/api/applications/status?application_url=${applicationUrlEncoded}`,
				{ method: 'GET' }
			);

			const status = await fetchStatus.json();

			if (status.status === 'COMPLETED') {
				clearInterval(interval);
				getApplicationStatusLoading = false;

				if (status && status.confirmation_url) {
					confirmationUrl = status.confirmation_url;
					message = 'Application is confirmed! You can now proceed.';
				} else {
					message = 'Application status is completed, but no confirmation URL found.';
				}
			}
		}
	};

	const patchApplicationConfirm = async () => {
		if (confirmationUrl) {
			patchApplicationConfirmLoading = true;

			const confirmationUrlEncoded = encodeURIComponent(confirmationUrl);
			const patchApplication = await fetch(
				`/api/applications/confirm?confirmation_url=${confirmationUrlEncoded}`,
				{ method: 'PATCH' }
			);

			const confirmation = await patchApplication.json();

			if (confirmation && confirmation.confirmed) {
				message = 'Application confirmed successfully!';
				patchApplicationConfirmLoading = false;
			}
		}
	};
</script>

<svelte:head>
	<title>Pertimm - Create Application</title>
</svelte:head>

<div class="w-full max-w-md">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-bold">Create Application</h1>
		<p class="text-gray-600">Fill in your details to create a new application</p>
	</div>

	<div class="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
		<form class="space-y-6">
			<div>
				<label for="email" class="mb-2 block text-lg font-bold">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="your@email.com"
					autocomplete="email"
					autocorrect="off"
					disabled={postApplicationRequestLoading}
					aria-label="Email"
					bind:value={email}
				/>
			</div>

			<div>
				<label for="first_name" class="mb-2 block text-lg font-bold">First Name</label>
				<input
					type="text"
					id="first_name"
					name="first_name"
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="John"
					disabled={postApplicationRequestLoading}
					aria-label="First Name"
					bind:value={firstName}
				/>
			</div>

			<div>
				<label for="last_name" class="mb-2 block text-lg font-bold">Last Name</label>
				<input
					type="text"
					id="last_name"
					name="last_name"
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="Doe"
					disabled={postApplicationRequestLoading}
					aria-label="Last Name"
					bind:value={lastName}
				/>
			</div>

			<button
				type="button"
				class="w-full border-4 border-black bg-[#bcaae0] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
				onclick={postApplicationRequest}
				disabled={postApplicationRequestLoading}
			>
				{postApplicationRequestLoading ? 'Creating...' : 'Create Application'}
			</button>

			<div>
				<label for="confirmation_url" class="mb-2 block text-lg font-bold">Confirmation URL</label>
				<input
					type="text"
					id="confirmation_url"
					name="confirmation_url"
					required
					value={confirmationUrl}
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="Confirmation URL will appear here"
					disabled
					aria-label="Confirmation URL"
				/>
			</div>

			<button
				type="button"
				class="w-full border-4 border-black bg-[#bcaae0] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={patchApplicationConfirmLoading}
				onclick={patchApplicationConfirm}
			>
				{patchApplicationConfirmLoading ? 'Confirming...' : 'Confirm Application'}
			</button>
		</form>
	</div>
</div>
