<template>
	<section
		v-else-if="error"
		class="hero is-fullheight is-danger"
	>
		<div class="hero-body">
			<div class="container">
				<h1 class="title has-text-centered">Error fetching earnings</h1>
				<pre class="block">{{ error }}</pre>
				<p class="has-text-centered">
					<a class="has-text-light has-text-weight-bold" :href="spreadsheetUrl">You can try opening the spreadsheet by clicking on this link</a>
				</p>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		error: {
			type: null,
			required: true
		},
		spreadsheetUrl: {
			type: String,
			required: true
		}
	},
	watch: {
		error: {
			immediate: true,
			handler(value) {
				console.error('error', value)
			}
		}
	}
}
</script>

