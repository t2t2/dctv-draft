<template>
	<div class="block">
		<div class="level">
			<div class="level-left">
				<span
					class="tag"
					:class="{'is-primary': place.rank === 1}"
				>{{ rankText }}</span> &nbsp; {{ nameText }}
			</div>
			<div class="level-right is-marginless">
				<BaseFormattedDollars
					:value="place.earnings"
					tag="span"
				/>
			</div>
		</div>
		<ul v-if="place.players.length > 1 && place.players.length <= maximumPeople">
			<li
				v-for="(player, i) in place.players"
				:key="i"
			>{{ player.name }}</li>
		</ul>
	</div>
</template>

<script>
import BaseFormattedDollars from '@/components/base-formatted-dollars'

export default {
	components: {
		BaseFormattedDollars
	},
	props: {
		maximumPeople: {
			type: Number,
			required: true
		},
		place: {
			type: Object,
			required: true
		}
	},
	computed: {
		multiplePlayers({place: {players}}) {
			return players.length > 1
		},
		nameText({multiplePlayers, place: {players}}) {
			if (multiplePlayers) {
				return `${players.length} way tie`
			}
			return players[0].name
		},
		rankText({multiplePlayers, place: {rank}}) {
			if (multiplePlayers) {
				return `#${rank}-${rank + this.place.players.length - 1}`
			}
			return `#${rank}`
		}
	}
}
</script>
