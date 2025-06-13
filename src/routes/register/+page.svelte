<script lang="ts">
	import EyeOpen from '../../components/icons/eye-open.svelte';
	import EyeClosed from '../../components/icons/eye-close.svelte';

	let { form } = $props();

	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};
</script>

<div class="w-full max-w-md">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-bold">Register</h1>
		<p class="text-gray-600">Create a new account</p>
	</div>

	{#if form?.error?.message}
		<div class="mb-4 rounded border-2 border-red-400 bg-red-100 p-3 text-red-700">
			{form.error.message}
		</div>
	{/if}

	<div class="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
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
				<label for="password1" class="mb-2 block text-lg font-bold">Password</label>
				<div class="relative">
					<input
						type={showPassword ? 'text' : 'password'}
						id="password1"
						name="password1"
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

			<div class="relative">
				<label for="password2" class="mb-2 block text-lg font-bold">Confirm Password</label>
				<div class="relative">
					<input
						type={showConfirmPassword ? 'text' : 'password'}
						id="password2"
						name="password2"
						required
						class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
						placeholder="••••••••"
					/>
					<button
						type="button"
						onclick={toggleConfirmPasswordVisibility}
						class="absolute top-1/2 right-4 -translate-y-1/2 transform"
						aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
					>
						{#if showConfirmPassword}
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
				Register
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
