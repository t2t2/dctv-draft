export default {
	computed: {
		routePrefix({$route}) {
			return $route.name.split('.')[0]
		}
	},
	methods: {
		routeTo(name, params = {}) {
			const to = {
				name: `${this.routePrefix}.${name}`,
				params: {
					...params
				}
			}

			if (this.$route.params.leagueKey) {
				to.params.leagueKey = this.$route.params.leagueKey
			}

			return to
		}
	}
}