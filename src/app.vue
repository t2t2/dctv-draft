<template>
	<div id="app">
		<RouterView />
	</div>
</template>

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
