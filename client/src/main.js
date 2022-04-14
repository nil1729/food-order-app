import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';
import firebase from './firebase';

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged(function(user) {
	if (!app) {
		app = new Vue({
			router,
			store,
			mounted() {
				if (user) {
					this.$store.dispatch('userAuthenticate', {
						type: 'loadUser',
						data: user,
					});
				} else {
					this.$store.commit('SET_PAGE_LOADING', false);
				}
			},
			render: (h) => h(App),
		}).$mount('#app');
	}
});

// =========== Just For Fun ============ //

const warningTitleCSS =
	'color:red; font-size:60px; font-weight: bold; -webkit-text-stroke: 1px black;';
const warningDescCSS = 'font-size: 18px;';
console.log('%cThank You!', warningTitleCSS);
console.log('%cMade by Nilanjan. Using Firebase, VueJS, NodeJS and MongoDB', warningDescCSS);
console.log('%cGo to https://github.com/nil1729/food-order-app for source code.', warningDescCSS);
console.log('%cIf you like this project, Please give a star on this repository.', warningDescCSS);

// =================================== //
