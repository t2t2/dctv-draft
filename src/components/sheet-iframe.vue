<template>
	<div class="wrapper">
		<TheNavbar 
			:spreadsheet="spreadsheet"
			:spreadsheet-url="spreadsheetUrl"
		/>
		<div class="content-wrapper">
			<iframe
				:src="spreadsheetUrl + '?widget=true&headers=false'"
				frameborder="0"
				style="display: block; width: 100%; height: 100%; flex-grow: 1"
			/>
		</div>
	</div>
</template>

<script>
import {state, fetchData} from '@/store'

import TheNavbar from '@/components/the-navbar'

export default {
	components: {
		TheNavbar
	},
	props: {
		spreadsheet: {
			type: Object,
			required: true
		},
		spreadsheetUrl: {
			type: String,
			required: true
		}
	},
	computed: {
		draft() {
			return state.draft
		}
	}
}
</script>

<style>
.content-wrapper {
	flex-grow: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
</style>
