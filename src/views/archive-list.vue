<template>
	<div class="wrapper">
		<div class="content-wrapper">
			<div class="section">
				<div class="container">
					<h1 class="title is-1">Choose League:</h1>
					<aside class="menu">
						<ul class="menu-list">
							<li>
								<RouterLink
									:to="{name: 'aggregated'}"
									active-class=""
								>
									Aggregated Stats
								</RouterLink>
							</li>
							<li
								v-for="sheet in allSheets"
								:key="sheet.key"
							>
								<RouterLink
									v-if="sheet.key === current"
									:to="{
										name: 'current.overview'
									}"
									active-class=""
								>
									{{ sheet.name }}
									<span class="tag is-primary">Current</span>
								</RouterLink>
								<RouterLink
									v-else
									:to="{
										name: 'archive.overview',
										params: {
											leagueKey: sheet.key
										}
									}"
								>
									{{ sheet.name }}
								</RouterLink>
							</li>
						</ul>
					</aside>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import sheets from '@/data/sheets.json'

export default {
	computed: {
		allSheets() {
			return sheets.data
		},
		current() {
			return sheets.current
		}
	}
}
</script>