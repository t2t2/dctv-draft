<template>
	<div id="app">
		<TheLoading
			v-if="loading"
			:step="2"
		/>
		<TheError
			v-else-if="error"
			:error="error"
			:spreadsheet-url="spreadsheetUrl"
		/>

		<TheLayout
			v-else
			:draft="draft"
			:spreadsheet-url="spreadsheetUrl"
		/>
	</div>
</template>

<script>
import axios from 'axios'

import TheError from '@/components/the-error'
import TheLayout from '@/components/the-layout'
import TheLoading from '@/components/the-loading'

import dataTransformer from './data-transform'

export default {
	components: {
		TheError,
		TheLayout,
		TheLoading
	},
	props: {
		spreadsheet: {
			type: String,
			required: true
		}
	},
	data: () => ({
		loading: true,
		error: null,
		draft: {
			title: '<> Movie Draft',
			movies: [],
			teams: {}
		}
	}),
	computed: {
		spreadsheetUrl() {
			return `https://docs.google.com/spreadsheets/d/e/${this.spreadsheet}/pubhtml`
		}
	},
	async mounted() {
		try {
			const {data} = await axios.get(this.spreadsheetUrl, {
					responseType: 'document'
			})

			this.draft = dataTransformer(data)
		} catch (err) {
			this.error = err
		}
		this.loading = false
	},
	watch: {
		'draft.title': {
			handler(value) {
				document.title = `${value} | <>.tv Movie Draft`
			}
		}
	}
}
</script>
