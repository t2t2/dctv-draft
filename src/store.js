import axios from 'axios'
import Vue from 'vue'

import dataTransformer from './data-transform'

export const state = Vue.observable({
	loading: true,
	error: null,
	draft: {
		title: '<> Movie Draft',
		chatrealm: {
			league: {},
			reverse: {},
			alternative: {}
		},
		movies: [],
		teams: {},
		status: {
			lastUpdate: new Date(1900, 0, 1, 0, 0, 0),
			seasonEnd: new Date(1900, 0, 1, 0, 0, 0),
			twitter: '',
			lastManualUpdate: new Date(1900, 0, 1, 0, 0, 0),
			manualUpdateMessage: '',
			chatrealmForm: null
		}
	}
})

export async function fetchData(spreadsheetUrl) {
	try {
		const {data} = await axios.get(spreadsheetUrl, {
			responseType: 'document'
		})

		state.draft = dataTransformer(data)
	} catch (err) {
		state.error = err
	}
	state.loading = false
}
