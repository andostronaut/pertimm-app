<script lang="ts">
	import EyeOpen from '../../components/icons/eye-open.svelte';
	import EyeClosed from '../../components/icons/eye-close.svelte';

	let email = $state('');
	let password = $state('');

	let postLoginLoading = $state(false);

	let showPassword = $state(false);

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const postLogin = async () => {
		postLoginLoading = true;

		const data = {
			email,
			password
		};

		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		if (response.ok) window.location.href = '/';

		postLoginLoading = false;
	};
</script>

<svelte:head>
	<title>Pertimm - Login</title>
</svelte:head>

<div class="w-full max-w-md">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-bold">Login</h1>
		<p class="text-gray-600">Enter your credentials to access your account</p>
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
					bind:value={email}
					autocomplete="email"
					disabled={postLoginLoading}
				/>
			</div>

			<div class="relative">
				<label for="password" class="mb-2 block text-lg font-bold">Password</label>
				<div class="relative">
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						name="password"
						required
						class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
						placeholder="••••••••"
						bind:value={password}
						disabled={postLoginLoading}
					/>
					<button
						type="button"
						onclick={togglePasswordVisibility}
						class="absolute top-1/2 right-4 -translate-y-1/2 transform"
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{#if showPassword}
							<EyeOpen />
						{:else}
							<EyeClosed />
						{/if}
					</button>
				</div>
			</div>

			<button
				type="button"
				onclick={postLogin}
				disabled={postLoginLoading}
				class="w-full border-4 border-black bg-[#bcaae0] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{postLoginLoading ? 'Logging in...' : 'Login'}
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
