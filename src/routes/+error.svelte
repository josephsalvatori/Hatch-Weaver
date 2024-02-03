<script>
import { page } from "$app/stores";
</script>

<div class="ca flex items-center justify-center">
	<div class="font-mono max-w-5xl border-2 rounded-[var(--border-radius)] p-[var(--content-gutter)]">
		<h1>{$page.status}</h1>
		<p>{$page.error?.message}</p>
	</div>
</div>