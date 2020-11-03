import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import firebase from '@/firebase';
Vue.use(VueRouter);

const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return {x:0, y:0}
	}
});

router.beforeEach(async (to, from, next) => {
	// Check for gaurds AUTHENTICATE
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// Check for is have Admin Logged in
		if (to.matched.some(record => record.meta.requiresAdmin)) {
			const user = await firebase.auth().currentUser;
			if (user) {
				const token = await user.getIdTokenResult();
				if (token.claims.siteAdmin) {
					return next();
				}
				next({
					path: "/",
					query: {
						redirect: "admin",
					},
				});
			} else {
				// Proceed to LOGIN page
				next({
					path: '/login',
					query: {
						redirect: to.fullPath
					},
				});
			}
			// Check for is have Any User Logged in
		} else if (firebase.auth().currentUser) {
			// Proceed to Route
			next();
		} else {
			// Proceed to LOGIN page
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				},
			});
		}
		// Check for gaurds NOT-AUTHENTICATED ( GUEST )
	} else if (to.matched.some(record => record.meta.requiresGuest)) {
		if (firebase.auth().currentUser) {
			// if is Logged in then go to Home Page
			next({
				path: from.fullPath,
				query: {
					redirect: to.fullPath
				},
			});
		} else {
			// Other wise That Page for Non Authenticated Users
			next();
		}
	} else {
		// Except these Guards
		console.log('Working');
		next();
	}
});

export default router;