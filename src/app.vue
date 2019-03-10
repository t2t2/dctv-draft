<template>
	<div id="app">
		<TheLoading
			v-if="state.loading"
			:step="2"
		/>
		<TheError
			v-else-if="state.error"
			:error="state.error"
			:spreadsheet-url="spreadsheetUrl"
		/>

		<TheLayout
			v-else
			:spreadsheet-url="spreadsheetUrl"
		/>
	</div>
</template>

<script>
import TheError from '@/components/the-error'
import TheLayout from '@/components/the-layout'
import TheLoading from '@/components/the-loading'

import {state, fetchData} from '@/store'

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
		state: state.$data
	}),
	computed: {
		spreadsheetUrl() {
			return `https://docs.google.com/spreadsheets/d/e/${this.spreadsheet}/pubhtml`
		}
	},
	mounted() {
		fetchData(this.spreadsheetUrl)
	},
	watch: {
		'state.draft.title': {
			handler(value) {
				document.title = `${value} | <>.tv Movie Draft`
			}
		}
	}
}
</script>
