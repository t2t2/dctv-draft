<template>
	<div>
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<span class="navbar-item" href="https://bulma.io">
					{{ draft.title }} Movie Draft
				</span>

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
						:to="{name: 'movies'}"
						class="navbar-item"
					>
						Movies
					</router-link>
				</div>

				<div class="navbar-end">
					<a
						href="https://draft.diamondclub.tv/form/"
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
						View Old Spreadsheet Experience
					</a>
				</div>
			</div>
		</nav>
		<router-view
			:draft="draft"
		/>
	</div>
</template>

<script>
export default {
	props: {
		draft: {
			type: Object,
			required: true
		},
		spreadsheetUrl: {
			type: String,
			required: true
		}
	}
}
</script>

