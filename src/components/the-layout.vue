<template>
	<div class="wrapper">
		<TheNavbar 
			:spreadsheet="spreadsheet"
			:spreadsheet-url="spreadsheetUrl"
		/>
		<div class="content-wrapper">
			<RouterLink
				v-if="draft.status.chatrealmForm"
				:to="routeTo('form')"
				class="is-block notification is-link"
			>
				<p class="has-text-weight-bold">Join The Chatrealm League</p>
				<p>Chatrealm league form closes the day after first movie release (usually ~0:00 saturday PT)</p>
			</RouterLink>
			<RouterLink
				v-if="routePrefix === 'current'"
				:to="{name: 'archive.overview', params: {leagueKey: '2019-summer'}}"
				class="is-block notification is-info"
			>
				<p class="has-text-weight-bold">Click here for 2019 Summer Movie League standings</p>
			</RouterLink>
			<RouterView />
		</div>
		<footer class="footer">
			<div class="content has-text-centered">
				<p>Data fetched from <span title="Obviously not related">Google Sheets</span> – Updated every 5 minutes</p>
			</div>
		</footer>
	</div>
</template>

<script>
import {state, fetchData} from '@/store'

import TheNavbar from '@/components/the-navbar'
import relativeLinksMixin from '@/mixins/relative-links'

export default {
	mixins: [relativeLinksMixin],
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
