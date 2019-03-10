<template>
	<time>{{ textualValue }}</time>
</template>

<script>
export default {
	props: {
		value: {
			type: Date,
			required: true
		},
		month: {
			type: String,
			default: 'short'
		}
	},
	computed: {
		textualValue() {
			return this.value.toLocaleString(undefined, {
				timeZone: 'UTC',
				month: this.month,
				day: '2-digit',
				year: 'numeric'
			})
		}
	}
}
</script>

