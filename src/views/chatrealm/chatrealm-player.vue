<template>
	<div class="columns">
		<div class="column is-2 is-3-tablet is-2-widescreen is-clipped">
			<p v-if="showName">{{ player.name }}</p>
			<p class="is-size-7">for <BaseFormattedMoney :value="player.spent" /></p>
		</div>
		<div class="column">
			<div class="tags">
				<span
					v-for="(movie, i) in chosenMovies"
					:key="i"
					class="tag"
				>
					{{ movie.name }}
				</span>
				<span
					v-if="reverseLeague && player.spent < 100"
					class="tag"
				>
					unspent&nbsp;<BaseFormattedMoney :value="100 - player.spent" />&nbsp;penalty
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import {state} from '@/store'
import BaseFormattedMoney from '@/components/base-formatted-money'

export default {
	components: {
		BaseFormattedMoney
	},
	props: {
		player: {
			type: Object,
			required: true
		},
		reverseLeague: {
			type: Boolean,
			default: false
		},
		showName: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		chosenMovies({player}) {
			return player.movies.map(movieId => state.draft.movies[movieId])
		}
	}
}
</script>
