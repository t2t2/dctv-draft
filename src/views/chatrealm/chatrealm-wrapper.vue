<template>
	<section class="section">
		<div class="container">
			<div class="tabs is-fullwidth">
				<ul>
					<router-link
						:to="{name: 'chatrealm.league', params: {type: 'league'}}"
						tag="li"
					>
						<a>Chatrealm League</a>
					</router-link>
					<router-link
						:to="{name: 'chatrealm.league', params: {type: 'reverse'}}"
						tag="li"
					>
						<a>Last With 100</a>
					</router-link>
					<router-link
						:to="{name: 'chatrealm.league', params: {type: 'alternative'}}"
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
export default {
}
</script>
