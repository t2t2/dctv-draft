<template>
	<div class="wrapper">
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<router-link
					:to="{name: 'overview'}"
					class="navbar-item"
					exact-active-class=""
				>
					{{ draft.title }} Movie Draft
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
				<div class="navbar-start">
					<router-link
						:to="{name: 'overview'}"
						class="navbar-item"
					>
						Overview
					</router-link>
					<router-link
						:to="{name: 'movies'}"
						class="navbar-item"
					>
						Movies
					</router-link>
					<router-link
						:to="{name: 'chatrealm'}"
						class="navbar-item"
						active-class="is-active"
					>
						Chatrealm League
					</router-link>
				</div>

				<div class="navbar-end">
					<a
						v-if="draft.status.chatrealmForm"
						:href="draft.status.chatrealmForm"
						target="_blank"
						rel="noopener noreferrer"
						class="navbar-item"
					>
						Join The Chatrealm League
					</a>
					<a
						:href="spreadsheetUrl"
						class="navbar-item"
						target="_blank"
						rel="noopener noreferrer"
					>
						View Spreadsheet
					</a>
					<a
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
		<div class="content-wrapper">
			<router-view />
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

import BaseIcon from '@/components/base-icon'

export default {
	components: {
		BaseIcon
	},
	props: {
		spreadsheetUrl: {
			type: String,
			required: true
		}
	},
	computed: {
		draft() {
			return state.draft
		}
	},
	methods: {
		refresh() {
			fetchData(this.spreadsheetUrl)
		}
	}
}
</script>

<style>
	.wrapper {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
	}
	.content-wrapper {
		flex-grow: 1;
	}
</style>
