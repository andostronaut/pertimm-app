<script lang="ts">
	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let error = $state('');
	let success = $state('');

	let showPassword = $state(false);

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};
</script>

<div class="w-full max-w-md">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-bold">Login</h1>
		<p class="text-gray-600">Enter your credentials to access your account</p>
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

			<div class="relative">
				<label for="password" class="mb-2 block text-lg font-bold">Password</label>
				<div class="relative">
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						bind:value={password}
						required
						class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
						placeholder="••••••••"
						disabled={isLoading}
					/>
					<button
						type="button"
						onclick={togglePasswordVisibility}
						class="absolute top-1/2 right-4 -translate-y-1/2 transform"
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{#if showPassword}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-eye-off"
								><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path
									d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
								></path><path
									d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
								></path><line x1="2" x2="22" y1="2" y2="22"></line></svg
							>{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-eye"
								><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle
									cx="12"
									cy="12"
									r="3"
								></circle></svg
							>
						{/if}
					</button>
				</div>
			</div>

			<button
				type="submit"
				class="w-full border-4 border-black bg-[#bcaae0] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={isLoading}
			>
				{isLoading ? 'Logging in...' : 'Login'}
			</button>
		</form>

		<div class="mt-6 text-center">
			<p>
				Don't have an account?
				<a href="/register" class="font-bold underline">Register</a>
			</p>
		</div>
	</div>
</div>
