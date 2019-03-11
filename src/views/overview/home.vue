<template>
	<section class="section">
		<div class="container">
			<div class="columns is-desktop">
				<div class="column is-two-thirds-desktop">
					<h1 class="title is-1">Standings</h1>
					<TeamRow
						v-for="team in rankedTeams"
						:key="team.name"
						:team="team"
					/>
				</div>
				<div class="column is-one-third-desktop">
					<ChatrealmOverview
						:places="10"
						type="league"
					/>
					<ChatrealmOverview
						:places="10"
						type="reverse"
					/>
					<div
						class="block"
						v-if="upcomingReleases.length > 0"
					>
						<h1 class="title is-3">Upcoming Releases</h1>
						<div class="content">
							<ol>
								<li
									v-for="movie in upcomingReleases"
									:key="movie.id"
									:class="{'has-text-primary': movie.thisWeek}"
								>
									{{ movie.name }} (<BaseFormattedDate :value="movie.releaseDate" />)
								</li>
							</ol>
						</div>
					</div>
					<div class="block">
						<h1 class="title is-3">League Info</h1>
						<div class="field">
							<div class="label">
								Last Updated:
							</div>
							<div class="control">
								<BaseFormattedDate :value="status.lastUpdate" month="long" />
							</div>
						</div>
						<div class="field">
							<div class="label">
								Season End:
							</div>
							<div class="control">
								<BaseFormattedDate :value="status.seasonEnd" month="long" />
							</div>
						</div>
						<div class="field">
							<div class="label">
								Last Manual Update:
							</div>
							<div class="control">
								<BaseFormattedDate :value="status.lastManualUpdate" month="long" />
								<p>{{ status.manualUpdateMessage }}</p>
							</div>
						</div>
						<p><a :href="status.twitter" target="_blank" rel="noopener noreferrer">Get Updates On Twitter</a></p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import {state} from '@/store'

import BaseFormattedDate from '@/components/base-formatted-date'
import ChatrealmOverview from '@/components/chatrealm-overview.vue'
import TeamRow from './team-row.vue'

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000

export default {
	components: {
		BaseFormattedDate,
		ChatrealmOverview,
		TeamRow
	},
	computed: {
		upcomingReleases() {
			const now = Date.now()

			return Object.values(state.draft.movies)
				.filter(movie => movie.releaseDate > now)
				.sort((a, b) => a.releaseDate - b.releaseDate)
				.slice(0, 5)
				.map(movie => ({
					...movie,
					thisWeek: (movie.releaseDate - now) < ONE_WEEK
				}))
		},
		rankedTeams() {
			return Object.values(state.draft.teams)
				.sort((a, b) => a.place - b.place)
		},
		status() {
			return state.draft.status
		}
	}
}
</script>
