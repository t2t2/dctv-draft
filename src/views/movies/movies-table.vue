<template>
	<section class="section">
		<div class="container">
			<h1 class="title">Movies to be drafted</h1>

			<div class="table-container">
				<table class="table is-fullwidth">
					<colgroup>
						<col style="width: 35%">
						<col style="width: 15%">
						<col style="width: 10%">
						<col style="width: 10%">
						<col style="width: 10%">
						<col style="width: 20%">
					</colgroup>
					<thead>
						<tr>
							<th>Movie</th>
							<th>Release Date</th>
							<th>Box Office Mojo</th>
							<th>Owner</th>
							<th class="has-text-right">Price Paid</th>
							<th class="has-text-right">Gross</th>
						</tr>
					</thead>
					<tbody>
						<MovieRow
							v-for="movie in orderedMovies"
							:key="movie.id"
							:movie="movie"
						/>
					</tbody>
				</table>
			</div>
		</div>
	</section>
</template>

<script>
import MovieRow from './movie-row'

export default {
	components: {
		MovieRow
	},
	props: {
		draft: {
			type: Object,
			required: true
		}
	},
	computed: {
		orderedMovies() {
			const {movies} = this.draft
			return Object.keys(movies)
				.map(key => movies[key])
				.sort((a, b) => a.releaseDate - b.releaseDate)
		}
	}
}
</script>
