<template>
	<section class="section">
		<div class="container">
			<div class="tabs is-fullwidth">
				<ul>
					<router-link
						:to="routeTo('chatrealm.league', {type: 'league'})"
						tag="li"
					>
						<a>Chatrealm League</a>
					</router-link>
					<router-link
						:to="routeTo('chatrealm.league', {type: 'reverse'})"
						tag="li"
					>
						<a>Last With 100</a>
					</router-link>
					<router-link
						:to="routeTo('chatrealm.league', {type: 'alternative'})"
						tag="li"
					>
						<a>Alternative picks</a>
					</router-link>
				</ul>
			</div>
			<router-view />
		</div>
	</section>
</template>

<script>
import relativeLinksMixin from '@/mixins/relative-links'

export default {
	mixins: [relativeLinksMixin]
}
</script>
