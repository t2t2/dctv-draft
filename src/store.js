import axios from 'axios'
import Vue from 'vue'

import dataTransformer from './data-transform'

const client = axios.create()
delete client.defaults.headers.common['Accept'] // For preload accuracy

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
		const {data} = await fetchWithCORSRetry(spreadsheetUrl)

		state.draft = dataTransformer(data)
	} catch (err) {
		console.error('error', err)
		state.error = err
	}
	state.loading = false
}

/**
 * If user has previously loaded spreadsheet, the cached response might throw a network error due to cors mismatch.
 * So add '?cors=1' as unique (it actually does nothing, google server responds the same), and if that is
 * busted (localhost and draft.diamondclub.tv clash) add timestamp
 *
 * @param {string} spreadsheetUrl
 */
async function fetchWithCORSRetry(spreadsheetUrl) {
	try {
		return await axios.get(spreadsheetUrl, {
			responseType: 'document',
			params: {
				cors: 1
			}
		})
	} catch(err) {
		if (err.message === 'Network Error') {
			return await axios.get(spreadsheetUrl, {
				responseType: 'document',
				params: {
					cors: Date.now()
				}
			})
		}
		throw err
	}
}
