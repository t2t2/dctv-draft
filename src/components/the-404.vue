<template>
	<section
		v-else-if="error"
		class="hero is-fullheight is-danger"
	>
		<div class="hero-body">
			<div class="container content">
				<h1 class="title has-text-centered">404</h1>
				<p class="has-text-centered">
					Yeah, never heard of it
				</p>
				<p class="has-text-centered">
					<RouterLink
						:to="{name: 'current.overview'}"
						class="has-text-light has-text-weight-bold"
					>
						View the current draft
					</RouterLink>
				</p>
				<p class="has-text-centered">
					<RouterLink
						:to="{name: 'archive'}"
						class="has-text-light has-text-weight-bold"
					>
						View the archive of drafts
					</RouterLink>
				</p>
			</div>
		</div>
	</section>
</template>
