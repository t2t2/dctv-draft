<template>
	<section class="section">
		<div class="container">
			<div class="box">
				<div class="field">
					<p>Filter</p>
				</div>
				<div class="columns">
					<div class="column is-one-third">
						<label class="label">Owner</label>
						<div class="select is-fullwidth">
							<select v-model="ownerFilter">
								<option :value="undefined">All</option>
								<option :value="''">Unowned</option>
								<option
									v-for="team in teams"
									:key="team.name"
									:value="team.name"
								>{{ team.name }}</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="table-container">
				<table class="table is-fullwidth">
					<colgroup>
						<col style="width: 30%">
						<col style="width: 15%">
						<col style="width: 10%">
						<col style="width: 10%">
						<col style="width: 10%">
						<col style="width: 15%">
						<col style="width: 15%">
					</colgroup>
					<thead>
						<tr>
							<th>Movie</th>
							<th>Release Date</th>
							<th>Box Office Mojo</th>
							<th>Owner</th>
							<th class="has-text-right">Purchase Price</th>
							<th class="has-text-right">Gross</th>
							<th class="has-text-right">Gross Per Price</th>
						</tr>
					</thead>
					<tbody v-if="orderedMovies.length > 0">
						<MovieRow
							v-for="movie in orderedMovies"
							:key="movie.id"
							:movie="movie"
						/>
					</tbody>
					<tbody v-else>
						<tr>
							<td
								class="has-text-centered"
								colspan="6"
							>
								<em>None</em>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</template>

<script>
import {state} from '@/store'
import MovieRow from './movie-row'

export default {
	components: {
		MovieRow
	},
	computed: {
		teams() {
			return state.draft.teams
		},
		orderedMovies() {
			const {movies} = state.draft
			return Object.keys(movies)
				.map(key => {
					const movie = movies[key]
					return {
						...movie,
						grossPerPrice: movie.gross / Math.max(movie.price, 1)
					}
				})
				.filter(movie => {
					if (this.ownerFilter === undefined) {
						return true
					}
					return movie.owner === this.ownerFilter
				})
				.sort((a, b) => a.releaseDate - b.releaseDate)
		},
		ownerFilter: {
			get() {
				return this.$route.query.owner
			},
			set(owner) {
				this.$router.push({
					path: this.$route.fullPath,
					query: {
						owner
					}
				})
			}
		}
	}
}
</script>
