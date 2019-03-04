<template>
	<section class="hero is-fullheight is-primary">
		<div class="hero-body">
			<div class="container">
				<div class="section has-text-centered">
					<h1 class="title">Loading...</h1>
					<progress class="progress is-link is-large" :value="step" max="3">{{ step / 3 * 100 }}%</progress>
					<p>{{ loadingMessage }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		step: {
			type: Number,
			required: true
		}
	},
	computed: {
		loadingMessage() {
			switch (this.step) {
				case 1:
					return 'Loading Site'
				case 2:
					return 'Fetching Earnings'
				default:
					return 'Calculating returns'
			}
		}
	}
}
</script>
