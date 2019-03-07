<template>
	<div class="columns">
		<div class="column is-3">
			<div class="is-sticky">
				<p class="title is-1 is-size-3-tablet is-size-2-desktop is-size-1-widescreen">{{ rankText }}</p>
				<BaseFormattedDollars
					:value="earnings"
					tag="p"
					class="subtitle is-3 is-size-4-tablet is-size-3-desktop"
				/>
			</div>
		</div>
		<div class="column is-9">
			<p class="title is-2">{{ nameText }}</p>
			<ChatrealmPlayer
				v-for="(player, i) in players"
				:key="i"
				:player="player"
				:reverse-league="reverseLeague"
				:show-name="multiplePlayers"
			/>
		</div>
	</div>
</template>

<script>
import BaseFormattedDollars from '@/components/base-formatted-dollars'
import ChatrealmPlayer from './chatrealm-player.vue'

export default {
	components: {
		BaseFormattedDollars,
		ChatrealmPlayer
	},
	props: {
		earnings: {
			type: Number,
			required: true
		},
		players: {
			type: Array,
			required: true
		},
		rank: {
			type: Number,
			required: true
		},
		reverseLeague: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		multiplePlayers({players}) {
			return players.length > 1
		},
		nameText({multiplePlayers, players}) {
			if (multiplePlayers) {
				return `${players.length} way tie`
			}
			return players[0].name
		},
		rankText({rank, multiplePlayers}) {
			if (multiplePlayers) {
				return `#${rank}-${rank + this.players.length - 1}`
			}
			return `#${rank}`
		}
	}
}
</script>

<style>
.is-sticky {
	position: sticky;
	top: 0;
}
</style>
