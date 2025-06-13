<script lang="ts">
	let { form } = $props();
</script>

<div class="w-full max-w-md">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-4xl font-bold">Create Application</h1>
		<p class="text-gray-600">Fill in your details to create a new application</p>
	</div>

	{#if form?.error?.message}
		<div class="mb-4 rounded border-2 border-red-400 bg-red-100 p-3 text-red-700">
			{form.error.message}
		</div>
	{/if}

	{#if form?.success?.message}
		<div class="mb-4 rounded border-2 border-green-400 bg-green-100 p-3 text-green-700">
			{form.success.message}
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

			<div>
				<label for="first_name" class="mb-2 block text-lg font-bold">First Name</label>
				<input
					type="text"
					id="first_name"
					name="first_name"
					required
					class="focus:ring-bcaae0 w-full border-4 border-black p-3 text-lg focus:ring-4 focus:outline-none"
					placeholder="John"
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
				/>
			</div>

			<button
				type="submit"
				class="w-full border-4 border-black bg-[#bcaae0] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
			>
				Create Application
			</button>

			<button
				type="submit"
				class="w-full border-4 border-black bg-[#dbdadf] p-3 text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
				disabled
			>
				Completing Application
			</button>
		</form>
	</div>
</div>
