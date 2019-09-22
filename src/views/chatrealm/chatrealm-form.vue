<template>
	<section class="section">
		<div v-if="formEndpoint" class="container">
			<form :action="formEndpoint" method="POST" target="form-target" class="block">
				<h1 class="title is-1">Chatrealm League Form</h1>
				<div class="content">
					<p>
						Think you can beat the hosts, Chatrealm? Well, submit your entry here, and it will be added to the main spreadsheet.
					</p>
					<p>
						NOTE: Only the first 1,000 Chatrealmers will be added to the spreadsheet. If you are entry 1,001, you will not be able to see your movies on the spreadsheet.
					</p>
					<p>
						Here are the instructions: You have ₪100 to spend just like the hosts. When you buy a movie, you are buying it at the same value that it was sold for during the draft. Therefore, make sure that your movies do not add up to more than ₪100 or your entry may be invalidated.
					</p>
				</div>

				<div class="field">
					<label for="chatrealm-form-name" class="label">Name</label>
					<div class="control">
						<input
							v-model="form.name"
							type="text"
							name="entry.1115419760"
							id="chatrealm-form-name"
							class="input"
							autocomplete="username"
							required
						>
					</div>
					<p class="help">The name you want displayed on the spreadsheet. Should probably be your chatroom handle (if applicable).</p>
				</div>
				<div class="field">
					<label for="chatrealm-form-email" class="label">Email Address</label>
					<div class="control">
						<input
							v-model="form.email"
							type="text"
							name="emailAddress"
							id="chatrealm-form-email"
							class="input"
							autocomplete="email"
							required
						>
					</div>
					<p class="help">Your email address, used to contact you in case anything happens. Will never be shared with anyone.</p>
				</div>
				<div class="field">
					<label class="label">League</label>
					<div class="control">
						<input
							v-model="form.league"
							class="is-checkradio"
							value="Chatrealm League"
							type="radio"
							name="entry.1682416139"
							id="chatrealm-form-league-chatrealm"
						>
						<label for="chatrealm-form-league-chatrealm">
							<strong>Chatrealm League</strong>
						</label>
						<p class="help">One entry per person</p>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<input
							v-model="form.league"
							class="is-checkradio"
							value="Last with 100 League"
							type="radio"
							name="entry.1682416139"
							id="chatrealm-form-league-last100"
						>
						<label for="chatrealm-form-league-last100">
							<strong>Last with 100 League</strong>
						</label>
						<p class="help">Try to get last place while spending ₪100. Any leftover ₪ will be multiplied by Average $ / ₪ and added to the total earnings. </p>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<input
							v-model="form.league"
							class="is-checkradio"
							value="Alternative Picks League"
							type="radio"
							name="entry.1682416139"
							id="chatrealm-form-league-alterative"
						>
						<label for="chatrealm-form-league-alterative">
							<strong>Alternative Picks League</strong>
						</label>
						<p class="help">Want to experiment other choices that won't overwrite your entry in chatrealm league? Use this! </p>
					</div>
				</div>
				<div class="field">
					<label class="label">Your Movies</label>
					<div class="control">
						<div class="columns">
							<div class="column is-two-thirds">
								<div
									v-for="movie in movies"
									:key="movie.id"
									class="field"
								>
									<input
										v-model="form.picks"
										:value="movie.name"
										:id="`chatrealm-form-movie-${movie.id}`"
										name="entry.1481534357"
										type="checkbox"
										class="is-checkradio"
									>
									<label :for="`chatrealm-form-movie-${movie.id}`">
										{{ movie.name }} (₪ {{ movie.price }})
									</label>
								</div>
							</div>
							<div class="column is-one-third">
								<div class="panel is-sticky">
									<div class="panel-heading">
										<div class="level">
											<span class="level-left">Selected Movies</span>
											<span
												class="level-right tag"
												:class="[picksCost > 100 ? 'is-danger' : 'is-info']"
											>₪ {{ picksCost }} / 100 </span>
										</div>
									</div>
									<div
										v-for="movie in pickedMovies"
										:key="movie.id"
										class="panel-block"
									>
										{{ movie.name }} (₪ {{ movie.price }})
									</div>
									<div v-if="picksCost <= 100" class="message is-info">
										<div class="message-body">
											₪ {{ 100 - picksCost }} money left
											<p v-if="form.league === 'last100' && picksCost < 100">
												Penalty: {{ 100 - picksCost }} * Average $ / ₪
											</p>
										</div>
									</div>
									<div v-else class="message is-danger">
										<div class="message-body">
											₪ {{ picksCost - 100 }} over limit
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<button
							:disabled="picksCost > 100 || !form.league"
							class="button is-primary"
							type="submit"
						>Submit</button>
					</div>
				</div>
			</form>
			<iframe name="form-target" src="about:blank" frameborder="0" style="width: 100%; height: 550px;"></iframe>
		</div>
		<div v-else class="container">
			<div class="notification is-danger">
				<p>The form to submit an entry into the draft isn't currently open.</p>
				<p>The form opens ~10 minutes after the draft happens and closes the midnight after first movie release.</p>
			</div>
		</div>
	</section>
</template>

<script>
import orderBy from 'lodash/orderBy'

import {state} from '@/store'

export default {
	data() {
		return {
			form: {
				name: '',
				email: '',
				league: '',
				picks: []
			}
		}
	},
	computed: {
		formEndpoint() {
			return state.draft.status.chatrealmForm
		},
		movies() {
			const {movies} = state.draft

			return orderBy(movies, 'releaseDate', 'asc')
		},
		pickedMovies({movies, form: {picks}}) {
			return picks.map(name => {
				return movies.find(movie => movie.name === name)
			}).filter(Boolean)
		},
		picksCost({pickedMovies}) {
			return pickedMovies.reduce((sum, movie) => sum + movie.price, 0)
		}
	}
}
</script>