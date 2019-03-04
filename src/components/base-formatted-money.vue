<script>
export default {
	functional: true,
	props: {
		value: {
			type: Number,
			required: true
		}
	},
	render(h, ctx) {
		return <span>₪ {ctx.props.value}</span>
	}
}
</script>

