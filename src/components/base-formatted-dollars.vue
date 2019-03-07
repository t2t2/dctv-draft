<script>
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

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
		return h(ctx.props.tag, ctx.data, [formatter.format(ctx.props.value)])
	}
}
</script>

