<script>
export default {
	functional: true,
	props: {
		value: {
			type: Number,
			required: true
		},
		tag: {
			type: String,
			default: 'span'
		}
	},
	render(h, ctx) {
		return h(ctx.props.tag, ctx.data, [`₪ ${ctx.props.value}`])
	}
}
</script>

