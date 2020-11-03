import Home from '@/components/pages/Home.vue';
import AdminDefault from '@/components/pages/adminDefault.vue';

const routes = [{
		name: 'Authenticatiion',
		component: () => import('@/components/pages/auth.vue'),
		path: '/login',
		meta: {
			requiresGuest: true,
		},
	},
	{
		path: '/',
		children: [{
				path: '/cart',
				name: 'Cart',
				component: () => import('@/components/pages/cart.vue'),
			},
			{
				path: '',
				name: 'Products',
				component: () => import('@/components/pages/Products.vue'),
			},
			{
				path: '/profile',
				name: 'Profile',
				component: () => import('@/components/pages/Profile.vue'),
			},
			{
				path: '/profile/settings',
				name: 'Settings',
				component: () => import('@/components/pages/Profile.vue'),
			},
			{
				path: '/view/:id',
				name: 'Product-View',
				component: () => import('@/components/pages/ProductView.vue'),
			},
			{
				path: '/checkout',
				name: 'Products-Checkout',
				component: () => import('@/components/pages/checkout.vue'),
			},
			{
				path: '/checkout/shipping',
				name: 'Shipping-Address',
				component: () => import('@/components/pages/shippingAddress.vue'),
			},
			{
				path: '/profile/orders',
				name: 'User-Orders',
				component: () => import('@/components/pages/userOrder.vue'),
			},
			{
				path: '/search',
				name: 'Search-Foods',
				component: () => import('@/components/pages/search.vue'),
			},


			// Admin Routes
			{
				path: 'admin',
				children: [{
						path: '',
						component: () => import('@/components/pages/adminPanel.vue')
					},
					{
						path: 'add-product',
						component: () => import('@/components/pages/addProduct.vue')
					},
					{
						path: 'product/:id/update',
						name: 'Dish Update',
						component: () => import('@/components/pages/updateProduct.vue')
					},
					{
						path: 'orders',
						component: () => import('@/components/pages/adminOrders.vue')
					}
				],
				meta: {
					requiresAdmin: true,
				},
				components: {
					default: AdminDefault
				}
			},
			{
				path: '*',
				name: 'NotFound',
				component: () => import('@/components/pages/NotFound.vue'),
			},
		],
		meta: {
			requiresAuth: true,
		},
		components: {
			default: Home,
		},
	},
];

export default routes;