import firebase from '@/firebase';
import axios from 'axios';
import createConfig from '../helpers/api-auth';

export default {
	// Signin actions
	async userAuthenticate(context, { type, data }) {
		let user = {
			...data.providerData[0],
		};
		const idToken = await firebase.auth().currentUser.getIdToken(true);
		localStorage.setItem('AUTH_TOKEN', idToken);
		if (type === 'register') {
			let res = await axios.get('/api/v1/register', createConfig());
			user = res.data.user;
		} else if (type === 'google-register') {
			let res = await axios.post(
				'/api/v1/google-register',
				{
					user,
				},
				createConfig()
			);
			user = res.data.user;
		} else {
			let res = await axios.get('/api/v1/login', createConfig());
			user = res.data.user;
		}
		context.commit('SET_ADMIN', user.siteAdmin);
		context.commit('SET_USER_STATE', user.details);
		context.commit('SET_SHIPPING_ADDRESS');
		context.commit('SET_CART_STATE', user.cart);
		context.commit('SET_PAGE_LOADING', false);
		await context.dispatch('fetchProducts', 1);
	},

	// Logout Actions
	async userSignOut() {
		localStorage.removeItem('AUTH_TOKEN');
		await firebase.auth().signOut();
	},

	clearAllState({ commit }) {
		commit('SET_USER_STATE', null);
		commit('SET_CART_STATE', null);
		commit('SET_USER_ORDERS', null);
		commit('SET_ADMIN', false);
		commit('SET_SHIPPING_ADDRESS', null);
		commit('SET_PRODUCTS', null);
		commit('SET_USER_ORDERS', null);
		commit('SET_ADMIN_ORDER_STATE', null);
		commit('SET_ADMIN_STORE_STATS', null);
	},
};
