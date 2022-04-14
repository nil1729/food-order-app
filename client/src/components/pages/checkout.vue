<template>
	<div class="container">
		<h1 v-if="isEmpty" class="text-center cart-empty-text mt-5">
			Your Cart is Currently Empty.
		</h1>
		<div v-else class="mt-3">
			<h1 class="text-center cart-text m-auto">Checkout Products</h1>
			<div class="row">
				<div class="col-md-8">
					<table class="table mt-4 table-responsive-sm">
						<thead>
							<tr class="text-uppercase">
								<th scope="col">Food items</th>
								<th scope="col">Dish name</th>
								<th scope="col">Restaurant</th>
								<th scope="col">price</th>
								<th scope="col">quantity</th>
								<th scope="col">total</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in cartItems" :key="item._id">
								<th scope="row">
									<div class="image">
										<img :src="item.photoURL" :alt="item._id" class="img-thumbnail img-fluid" />
									</div>
								</th>
								<td>
									<router-link :to="'/view/' + item._id">{{ item.dish }}</router-link>
								</td>
								<td class="price text-danger">{{ item.restaurant }}</td>
								<td class="price">
									₹{{ windowWidth > 600 ? '  ' : '' }}{{ formatPrice(item.price) }}
								</td>
								<td class="font-weight-bold">{{ item.quantity }}</td>
								<td class="price">
									₹{{ windowWidth > 600 ? '  ' : '' }}{{ formatPrice(item.price * item.quantity) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col-md-4">
					<div class="container flex-column mx-auto text-center mt-5">
						<p class="lead text-primary">
							Products Total :
							<span class="ml-2 font-weight-normal text-dark"
								>₹ {{ formatPrice(productTotal) }}</span
							>
						</p>
						<p class="lead text-primary">
							Tax (GST 5%) :
							<span class="ml-2 font-weight-normal text-dark">₹ {{ formatPrice(taxTotal) }}</span>
						</p>
						<p class="lead text-primary">
							Grand Total :
							<span class="ml-2 font-weight-normal text-dark"
								>₹ {{ formatPrice((taxTotal + productTotal).toFixed(2)) }}</span
							>
						</p>
						<div v-if="!isPaid">
							<div v-if="!razorPaySdkLoaded" class="script__loader mx-auto my-3">
								<img src="@/assets/script-loader.gif" alt="" />
							</div>
							<div v-else class="text-center mb-4 mt-2">
								<button class="btn btn-info px-3 py-0" @click="displayRazorPay">
									<img src="@/assets/razorpay-icon.svg" alt="" height="40" width="40" />Pay with
									RazorPay
								</button>
							</div>
						</div>
						<div v-else class="mt-4">
							<h3 class="text-success">
								<i class="fa-2x fal fa-check-circle"></i>
							</h3>
							<h3 v-if="processing" class="text-success">
								Processing your Order ...
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
		<app-checkout-loader v-if="processing" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CheckoutLoader from '../utils/FullPageLoad';

export default {
	name: 'Cart-Page',
	data() {
		return {
			processing: false,
			isPaid: false,
			windowWidth: window.innerWidth,
			orderDetailsForCheckout: null,
			razorPaySdkLoaded: false,
		};
	},
	components: {
		'app-checkout-loader': CheckoutLoader,
	},
	mounted() {
		window.onresize = () => {
			this.windowWidth = window.innerWidth;
		};
		this.loadRazorPaySdk();
	},
	methods: {
		async loadScript(srcPath) {
			return new Promise((resolve) => {
				const scriptEl = document.createElement('script');
				scriptEl.src = srcPath;
				document.body.appendChild(scriptEl);
				scriptEl.onload = () => {
					resolve(true);
				};
				scriptEl.onerror = () => {
					resolve(false);
				};
				document.body.appendChild(scriptEl);
			});
		},

		async loadRazorPaySdk() {
			try {
				await this.loadScript(process.env.VUE_APP_RAZORPAY_SCRIPT_SRC);
				const orderDetails = await this.$store.dispatch('fetchCheckoutItems');
				this.orderDetailsForCheckout = orderDetails;
				this.razorPaySdkLoaded = true;
			} catch (e) {
				console.log(e);
			}
		},

		async displayRazorPay() {
			const vm = this;
			if (this.razorPaySdkLoaded) {
				const options = {
					key: process.env.VUE_APP_RAZORPAY_KEY_ID,
					name: process.env.VUE_APP_WEBSITE_BRAND_NAME,
					description: process.env.VUE_APP_CHECKOUT_DESCRIPTION,
					image: process.env.VUE_APP_RAZORPAY_POPUP_IMAGE,
					order_id: this.orderDetailsForCheckout.order_details.id,
					handler: async function(response) {
						await vm.savePaymentDetails(response);
					},
					prefill: {
						name: process.env.VUE_APP_DEVELOPER_NAME,
						email: process.env.VUE_APP_DEVELOPER_EMAIL_ADDRESS,
					},
					theme: {
						color: process.env.VUE_APP_RAZORPAY_POPUP_COLOR,
					},
				};
				const paymentObj = new window.Razorpay(options);
				this.razorPaySdkLoaded = true;
				paymentObj.open();
			} else {
				alert('RazorPay not loaded. Kindly reload this page and try again');
			}
		},

		async savePaymentDetails(payment_response) {
			try {
				this.processing = true;
				this.isPaid = true;

				await this.$store.dispatch('verifyPurchase', {
					orderStaticID: this.orderDetailsForCheckout.order_static_id,
					paymentResponse: payment_response,
				});

				this.handleEmptyCart();
				this.processing = false;
				this.isPaid = false;
				this.$router.push('/profile/orders');
			} catch (e) {
				console.log(e);
			}
		},
		async handleEmptyCart() {
			this.$store.commit('CLEAR_CART');
			await this.$store.dispatch('saveCartProduct');
		},
	},
	beforeRouteEnter(to, from, next) {
		if (from.name === 'Shipping-Address') next();
		else {
			next({ name: 'Cart' });
		}
	},
	computed: {
		...mapGetters(['formatPrice']),
		isEmpty: function() {
			return this.$store.state.cart && this.$store.state.cart.length === 0;
		},
		cartItems: function() {
			return this.$store.state.cart;
		},
		productTotal() {
			let total = 0;
			this.$store.state.cart.forEach((item) => (total += item.price * item.quantity));
			return parseFloat(total.toFixed(2));
		},
		taxTotal() {
			return parseFloat(((this.productTotal * 5) / 100).toFixed(2));
		},
	},
};
</script>

<style scoped>
.script__loader {
	height: 120px;
	width: 120px;
}
.cart-empty-text,
.cart-text {
	font-weight: 400;
}
.cart-text {
	border-bottom: 1px solid grey;
	width: fit-content;
}
table {
	border-bottom: 1px solid #dee2e6;
}
.table thead th {
	border-top: none;
}
.table th,
.table td {
	vertical-align: middle;
	text-align: center;
}
.image {
	height: 100px;
	width: 100px;
	margin: auto;
}
img {
	height: 100%;
}
.price:last-child {
	font-weight: 700 !important;
}
.price {
	letter-spacing: 0.5px;
	font-size: 1rem;
}

button {
	box-shadow: none !important;
}
.clear-cart-btn {
	font-weight: 500;
	font-size: 1rem;
	letter-spacing: 0.5px;
}
.trash {
	color: red;
}
.lead {
	font-weight: 500;
}
@media screen and (max-width: 600px) {
	.table thead th {
		font-size: 0.8rem;
	}
}
</style>
