<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { goto } from '$app/navigation';

	import { register } from '../api';

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let isLoading = $state(false);
	let error = $state('');
	let success = $state('');

	const handleSubmit = async () => {
		try {
			if (password !== confirmPassword) {
				error = "Passwords don't match!";
				return;
			}

			isLoading = true;
			error = '';
			success = '';

			await register(email, password);
			success = 'Registration successful! You can now login.';

			goto('/');
		} catch (err) {
			error = 'Registration failed. Please try again.';
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="w-full max-w-md">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-bold">Register</h1>
		<p class="text-gray-600">Create a new account</p>
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

		<form onsubmit={preventDefault(handleSubmit)} class="space-y-6">
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
				<label for="password" class="mb-2 block text-lg font-bold">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="••••••••"
					disabled={isLoading}
				/>
			</div>

			<div>
				<label for="confirmPassword" class="mb-2 block text-lg font-bold">Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					bind:value={confirmPassword}
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="••••••••"
					disabled={isLoading}
				/>
			</div>

			<button
				type="submit"
				class="w-full border-4 border-black bg-[#bcaae0] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={isLoading}
			>
				{isLoading ? 'Registering...' : 'Register'}
			</button>
		</form>

		<div class="mt-6 text-center">
			<p>
				Already have an account?
				<a href="/" class="font-bold underline">Login</a>
			</p>
		</div>
	</div>
</div>
