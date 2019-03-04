<script>
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

export default {
	functional: true,
	props: {
		value: {
			type: Number,
			required: true
		}
	},
	render(h, ctx) {
		return <span>{formatter.format(ctx.props.value)}</span>
	}
}
</script>

