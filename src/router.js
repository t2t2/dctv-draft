import Vue from 'vue'
import Router from 'vue-router'
import SheetLoader from './components/sheet-loader.vue'
import ArchiveList from './views/archive-list.vue'
import ChatrealmForm from './views/chatrealm/chatrealm-form.vue'
import ChatrealmHome from './views/chatrealm/chatrealm-home.vue'
import ChatrealmLeague from './views/chatrealm/chatrealm-league.vue'
import ChatrealmWrapper from './views/chatrealm/chatrealm-wrapper.vue'
import MoviesTable from './views/movies/movies-table.vue'
import Overview from './views/overview/home.vue'

import sheets from './data/sheets.json'

Vue.use(Router)

function sheetSubviews(namePrefix) {
	return [
		{
			path: '',
			name: `${namePrefix}.overview`,
			component: Overview
		},
		{
			path: 'movies',
			name: `${namePrefix}.movies`,
			component: MoviesTable
		},
		{
			path: 'chatrealm',
			component: ChatrealmWrapper,
			children: [
				{
					path: ':type(league|reverse|alternative)',
					name: `${namePrefix}.chatrealm.league`,
					component: ChatrealmLeague,
					props: true
				},
				{
					path: '',
					name: `${namePrefix}.chatrealm`,
					component: ChatrealmHome
				}
			]
		},
		{
			path: 'form',
			name: `${namePrefix}.form`,
			component: ChatrealmForm
		}
	]
}

export default new Router({
	mode: 'history',
	linkActiveClass: 'is-active',
	linkExactActiveClass: 'is-active',
	routes: [
		{
			path: '/aggregated',
			name: 'aggregated',
			component: SheetLoader,
			props: {
				spreadsheet: {
					key: 'aggregated',
					name: 'Aggregated Movie Draft Stats',
					schema: 0,
					gsheetId: '2PACX-1vQ9hG-n6BvaSXdtjS00JLSa38zdsINwQ8EtX92TKNGHzU-TcNKpcXun2Jqq1Q6joJfkkiDy90RejCNa'
				}
			}
		},
		{
			path: '/archive',
			component: {
				render: h => <RouterView />
			},
			children: [
				{
					path: '',
					name: 'archive',
					component: ArchiveList
				},
				{
					path: ':leagueKey',
					component: SheetLoader,
					props(route) {
						return {
							spreadsheet: sheets.data.find(({key}) => key === route.params.leagueKey)
						}
					},
					children: sheetSubviews('archive')
				}
			]
		},
		{
			path: '/',
			component: SheetLoader,
			props() {
				return {
					spreadsheet: sheets.data.find(({key}) => key === sheets.current)
				}
			},
			children: sheetSubviews('current')
		}
	]
})
