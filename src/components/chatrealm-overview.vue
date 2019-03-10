<template>
	<div class="block">
		<h1 class="title is-3">{{ leagueName }}</h1>
		<h2 class="subtitle is-5">Top {{ places }}</h2>

		<ChatrealmOverviewPlace
			v-for="place in groupedByPlace"
			:key="place.rank"
			:place="place"
			:maximum-people="places"
		/>
		<router-link
			:to="{name: 'chatrealm.league', params: {type}}"
			class="button is-primary is-outlined is-fullwidth"
		>
			View full standings &raquo;
		</router-link>
	</div>
</template>

<script>
import {state} from '@/store'

import ChatrealmOverviewPlace from './chatrealm-overview-place.vue'

export default {
	components: {
		ChatrealmOverviewPlace
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: type => ['league', 'reverse', 'alternative'].includes(type)
		},
		places: {
			type: Number,
			default: 25
		}
	},
	computed: {
		groupedByPlace() {
			const places = state.draft.chatrealm[this.type].places

			const placesToGet = this.places
			let placesSoFar = 0
			const upTo = places.findIndex(({rank, people}) => {
				if (placesSoFar >= placesToGet) {
					return true
				}
				placesSoFar += people
			})

			return places.slice(0, upTo >= 0 ? upTo : places.length)
		},
		leagueName({type}) {
			switch(type) {
				case 'league':
					return 'Chatrealm League'
				case 'reverse':
					return 'Last With 100'
				default:
					return ''
			}
		}
	}
}
</script>
