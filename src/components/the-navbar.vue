<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<router-link
				:to="isAggregated ? '/' : routeTo('overview')"
				class="navbar-item"
				active-class=""
				exact-active-class=""
			>
				{{ spreadsheet.name }}
			</router-link>

			<!--
			<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
			-->
		</div>

		<div class="navbar-menu is-active">
			<div
				class="navbar-start"
			>
				<router-link
					v-if="!isCurrent"
					:to="{name: 'current.overview'}"
					class="navbar-item"
					active-class=""
				>
					Back To Current
				</router-link>

				<template v-if="spreadsheet.schema > 0">
					<router-link
						:to="routeTo('overview')"
						class="navbar-item"
						active-class=""
					>
						Overview
					</router-link>
					<router-link
						:to="routeTo('movies')"
						class="navbar-item"
					>
						Movies
					</router-link>
					<router-link
						:to="routeTo('chatrealm')"
						class="navbar-item"
						active-class="is-active"
					>
						Chatrealm League
					</router-link>
				</template>
			</div>

			<div class="navbar-end">
				<router-link
					:to="{name: 'archive'}"
					class="navbar-item"
					active-class=""
				>
					View Archive
				</router-link>
				<a
					:href="spreadsheetUrl"
					class="navbar-item"
					target="_blank"
					rel="noopener noreferrer"
				>
					View Spreadsheet
				</a>
				<a
					v-if="spreadsheet.schema > 0"
					class="navbar-item"
					@click="refresh"
				>
					<span class="is-hidden-desktop">Refresh </span>
					<span class="icon is-small">
						<BaseIcon name="refresh" />
					</span>
				</a>
			</div>
		</div>
	</nav>
</template>

<script>
import BaseIcon from '@/components/base-icon'
import {state, fetchData} from '@/store'
import sheets from '@/data/sheets.json'
import relativeLinksMixin from '@/mixins/relative-links'

export default {
	mixins: [relativeLinksMixin],
	components: {
		BaseIcon,
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
		isAggregated({routePrefix}) {
			return routePrefix === 'aggregated'
		},
		draft() {
			return state.draft
		},
		isCurrent({routePrefix}) {
			return routePrefix === 'current'
		}
	},
	methods: {
		refresh() {
			fetchData(this.spreadsheetUrl)
		}
	}
}
</script>