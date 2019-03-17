<template>
	<div
		class="message"
		:class="{'is-primary': team.place === 1}"
	>
		<div class="message-header is-block">
			<div class="columns is-vcentered">
				<div class="column">
					<h1
						class="is-size-2 is-size-3-desktop is-size-2-widescreen"
						
					>#{{ team.place }} {{ team.name }}</h1>
				</div>
				<div class="column has-text-left has-text-right-tablet">
					<BaseFormattedDollars
						:value="team.earnings"
						class="is-size-4 is-size-3-tablet"
					/>
				</div>
			</div>
		</div>
		<div class="message-body">
			<div
				v-for="movie in movies"
				:key="movie.id"
			>
				{{ movie.name }} 
				<span class="has-text-grey">
					<BaseFormattedDollars
						v-if="movie.released"
						:value="movie.gross"
					/>
					<template v-else>(releases <BaseFormattedDate :value="movie.releaseDate" />)</template>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import {state} from '@/store'
import {movieIsReleased} from '@/utils'

import BaseFormattedDate from '@/components/base-formatted-date'
import BaseFormattedDollars from '@/components/base-formatted-dollars'

export default {
	components: {
		BaseFormattedDate,
		BaseFormattedDollars
	},
	props: {
		team: {
			type: Object,
			required: true
		}
	},
	computed: {
		movies() {
			const owner = this.team.name
			const now = Date.now()

			return Object.values(state.draft.movies)
				.filter(movie => movie.owner === owner)
				.sort((a, b) => a.releaseDate - b.releaseDate)
				.map(movie => ({
					...movie,
					released: movieIsReleased(movie)
				}))
		}
	}
}
</script>
