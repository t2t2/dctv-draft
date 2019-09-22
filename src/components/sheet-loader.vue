<template>
	<div id="app">
		<The404
			v-if="!spreadsheet"
		/>
		<SheetIframe
			v-else-if="spreadsheet.schema === 0"
			:spreadsheet="spreadsheet"
			:spreadsheet-url="spreadsheetUrl"
		/>
		<TheLoading
			v-else-if="state.loading"
			:step="2"
		/>
		<TheError
			v-else-if="state.error"
			:error="state.error"
			:spreadsheet-url="spreadsheetUrl"
		/>

		<TheLayout
			v-else
			:spreadsheet="spreadsheet"
			:spreadsheet-url="spreadsheetUrl"
		/>
	</div>
</template>

<script>
import SheetIframe from '@/components/sheet-iframe'
import The404 from '@/components/the-404'
import TheError from '@/components/the-error'
import TheLayout from '@/components/the-layout'
import TheLoading from '@/components/the-loading'

import {state, fetchData} from '@/store'

export default {
	components: {
		SheetIframe,
		The404,
		TheError,
		TheLayout,
		TheLoading
	},
	props: {
		spreadsheet: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		state: state.$data
	}),
	computed: {
		spreadsheetUrl({spreadsheet: {gsheetId = null} = {}}) {
			if (!gsheetId) {
				return 'about:blank'
			}
			if (gsheetId.length === 44) {
				return `https://docs.google.com/spreadsheets/d/${this.spreadsheet.gsheetId}/pubhtml`
			}
			return `https://docs.google.com/spreadsheets/d/e/${this.spreadsheet.gsheetId}/pubhtml`
		}
	},
	watch: {
		'spreadsheet.name': {
			handler(value) {
				document.title = `${value} | <>.tv Movie Draft`
			},
			immediate: true
		},
		'spreadsheet.key': {
			handler(value) {
				if (value && this.spreadsheet.schema > 0) {
					fetchData(this.spreadsheetUrl)
				}
			},
			immediate: true
		}
	}
}
</script>
