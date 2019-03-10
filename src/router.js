import Vue from 'vue'
import Router from 'vue-router'
import ChatrealmHome from './views/chatrealm/chatrealm-home.vue'
import ChatrealmLeague from './views/chatrealm/chatrealm-league.vue'
import ChatrealmWrapper from './views/chatrealm/chatrealm-wrapper.vue'
import MoviesTable from './views/movies/movies-table.vue'
import Overview from './views/overview/home.vue'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	linkActiveClass: '',
	linkExactActiveClass: 'is-active',
	routes: [
		{
			path: '/',
			name: 'overview',
			component: Overview
		},
		{
			path: '/movies',
			name: 'movies',
			component: MoviesTable
		},
		{
			path: '/chatrealm',
			component: ChatrealmWrapper,
			children: [
				{
					path: ':type(league|reverse|alternative)',
					name: 'chatrealm.league',
					component: ChatrealmLeague,
					props: true
				},
				{
					path: '',
					name: 'chatrealm',
					component: ChatrealmHome
				}
			]
		}
	]
})
