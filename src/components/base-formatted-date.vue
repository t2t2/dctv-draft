<template>
	<time>{{ textualValue }}</time>
</template>

<script>
export default {
	props: {
		value: {
			type: Date,
			required: true
		}
	},
	computed: {
		textualValue() {
			return this.value.toLocaleString(undefined, {
				timeZone: 'UTC',
				month: 'short',
				day: '2-digit',
				year: 'numeric'
			})
		}
	}
}
</script>

