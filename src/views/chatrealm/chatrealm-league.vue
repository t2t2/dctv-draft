<template>
	<div>
		<div class="block">
			<p>{{ leagueDescription }}</p>
		</div>
		<ChatrealmPlace
			v-for="{earnings, rank, players} in groupedByPlace"
			:key="rank"
			:earnings="earnings"
			:rank="rank"
			:players="players"
			:reverse-league="reverseLeague"
		/>
	</div>
</template>

<script>
import {state} from '@/store'

import ChatrealmPlace from './chatrealm-place.vue'

export default {
	components: {
		ChatrealmPlace
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: type => ['league', 'reverse', 'alternative'].includes(type)
		}
	},
	computed: {
		groupedByPlace() {
			const players = state.draft.chatrealm[this.type]
			const groups = new Map()
			players.forEach(player => {
				const rank = player.rank
				if (!groups.has(rank)) {
					groups.set(rank, [])
				}
				groups.get(rank).push(player)
			})

			return Array.from(groups.keys())
				.sort((a, b) => a - b)
				.map(rank => ({
					rank: parseFloat(rank),
					earnings: groups.get(rank)[0].earnings,
					players: groups.get(rank)
				}))
		},
		leagueDescription({type}) {
			switch(type) {
				case 'league':
					return "Think you're smarter than the hosts, chatrealm? Well of course you are, here's your chance to use ₪100 to put together the best slate at prices decided by the draft."
				case 'reverse':
					return "Try to get last place while spending ₪100. Any leftover ₪ will be multiplied by Average ₪ / $ and added to the total earnings."
				case 'alternative':
					return "Slates people were too afraid to pick"
				default:
					return ''
			}
		},
		reverseLeague({type}) {
			return type === 'reverse'
		}
	}
}
</script>
