import Vue from 'vue'
import Router from 'vue-router'
import MoviesTable from './views/movies/movies-table.vue'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	linkActiveClass: 'is-active',
	routes: [
		{
			path: '/',
			name: 'movies',
			component: MoviesTable
		}
	]
})
