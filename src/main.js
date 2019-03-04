import Vue from 'vue'
import 'bulmaswatch/pulse/bulmaswatch.min.css'
import App from './app.vue'
import router from './router'

Vue.config.productionTip = false

const target = document.getElementById('app')

new Vue({
	router,
	render: h => h(App, {
		props: target.dataset
	})
}).$mount('#app')
