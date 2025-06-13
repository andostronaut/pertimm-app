<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-white flex items-center justify-center p-6">
    {@render children()}
</div>
