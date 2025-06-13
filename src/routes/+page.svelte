<script lang="ts">
	let email = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let isLoading = $state(false);
	let error = $state('');
	let success = $state('');
</script>

<div class="w-full max-w-md">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-bold">Create Application</h1>
		<p class="text-gray-600">Fill in your details to create a new application</p>
	</div>

	<div class="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
		{#if error}
			<div class="mb-4 rounded border-2 border-red-400 bg-red-100 p-3 text-red-700">
				{error}
			</div>
		{/if}

		{#if success}
			<div class="mb-4 rounded border-2 border-green-400 bg-green-100 p-3 text-green-700">
				{success}
			</div>
		{/if}

		<form method="POST" class="space-y-6">
			<div>
				<label for="email" class="mb-2 block text-lg font-bold">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="your@email.com"
					disabled={isLoading}
				/>
			</div>

			<div>
				<label for="firstName" class="mb-2 block text-lg font-bold">First Name</label>
				<input
					type="text"
					id="firstName"
					bind:value={firstName}
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="John"
					disabled={isLoading}
				/>
			</div>

			<div>
				<label for="lastName" class="mb-2 block text-lg font-bold">Last Name</label>
				<input
					type="text"
					id="lastName"
					bind:value={lastName}
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="Doe"
					disabled={isLoading}
				/>
			</div>

			<button
				type="submit"
				class="w-full border-4 border-black bg-[#bcaae0] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={isLoading}
			>
				{isLoading ? 'Submitting...' : 'Create Application'}
			</button>
		</form>

		<div class="mt-6 text-center">
			<p>
				<a href="/" class="font-bold underline">Back to Login</a>
			</p>
		</div>
	</div>
</div>
