<script lang="ts">
	import EyeOpen from '../../components/icons/eye-open.svelte';
	import EyeClosed from '../../components/icons/eye-close.svelte';

	let { form } = $props();

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
		{#if form?.error?.message}
			<div class="mb-4 rounded border-2 border-red-400 bg-red-100 p-3 text-red-700">
				{form.error.message}
			</div>
		{/if}

		<form method="POST" class="space-y-6">
			<div>
				<label for="email" class="mb-2 block text-lg font-bold">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="your@email.com"
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
				type="submit"
				class="w-full border-4 border-black bg-[#bcaae0] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
			>
				Login
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
