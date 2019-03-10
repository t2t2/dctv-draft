<template>
	<div class="columns is-desktop">
		<div class="column is-half">
			<ChatrealmOverview
				:places="25"
				type="league"
			/>
		</div>
		<div class="column is-half">
			<ChatrealmOverview
				:places="25"
				type="reverse"
			/>
		</div>
	</div>
</template>

<script>
import ChatrealmOverview from '@/components/chatrealm-overview.vue'

export default {
	components: {
		ChatrealmOverview
	}
}
</script>
