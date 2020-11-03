<template>
	<div class="container">
		<h1 v-if="isEmpty" class="text-center cart-empty-text mt-5">
			Your Cart is Currently Empty
		</h1>
		<div v-else class="mt-3">
			<h1 class="text-center cart-text m-auto">Your Cart</h1>
			<table class="table mt-4 table-responsive-sm">
				<thead>
					<tr class="text-uppercase">
						<th scope="col">Food Items</th>
						<th scope="col">Dish Name</th>
						<th scope="col">price</th>
						<th scope="col">Restaurant</th>
						<th scope="col">quantity</th>
						<th scope="col">remove</th>
						<th scope="col">total</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in cartItems" :key="item._id">
						<th scope="row">
							<div class="image">
								<img
									:src="item.photoURL"
									:alt="item._id"
									class="img-thumbnail img-fluid"
								/>
							</div>
						</th>
						<td>
							<router-link :to="'/view/' + item._id">{{
								item.dish
							}}</router-link>
							<br />
							<p v-if="item.stock <= 0" class="lead text-danger">
								Out of Stock
							</p>
						</td>
						<td class="price">
							₹{{ windowWidth > 600 ? '  ' : '' }}{{ formatPrice(item.price) }}
						</td>
						<td class="price text-danger">{{ item.restaurant }}</td>
						<td>
							<div class="btn-group" role="group" aria-label="Basic example">
								<button
									:disabled="item.quantity < 2"
									@click="changeQuantity(item._id, -1)"
									type="button"
									class="btn btn-outline-info"
								>
									-
								</button>
								<button type="button" class="btn btn-outline-info">
									{{ item.quantity > item.stock ? item.stock : item.quantity }}
								</button>
								<button
									@click="changeQuantity(item._id, 1)"
									:disabled="item.stock === 1 || item.stock < item.quantity"
									type="button"
									class="btn btn-outline-info"
								>
									+
								</button>
							</div>
						</td>
						<td>
							<button @click="remove(item._id)" class="btn btn-lg trash">
								<i class="fad fa-trash"></i>
							</button>
						</td>
						<td class="price">
							₹{{ windowWidth > 600 ? '  ' : ''
							}}{{ formatPrice(item.price * item.quantity) }}
						</td>
					</tr>
				</tbody>
			</table>
			<div
				class="container d-flex justify-content-center align-items-end flex-column"
			>
				<div class="row mr-0">
					<button
						v-if="showSaveButton"
						:disabled="loading || cartSaved"
						@click="handleSaveCart"
						class="btn btn-outline-success mr-4 btn-sm mb-2 clear-cart-btn"
					>
						{{
							cartSaved
								? 'Saved for later'
								: loading
								? 'Saving Cart ...'
								: 'Save for Later'
						}}
					</button>
					<button
						:disabled="loading"
						@click="handleEmptyCart"
						class="btn btn-outline-danger btn-sm mb-2 clear-cart-btn"
					>
						Clear Cart
					</button>
				</div>

				<p class="lead text-primary">
					Product Total :
					<span class="ml-2 font-weight-normal text-dark"
						>₹ {{ formatPrice(productTotal) }}</span
					>
				</p>
				<p class="lead text-primary">
					Tax (GST 5%) :
					<span class="ml-2 font-weight-normal text-dark"
						>₹ {{ formatPrice(taxTotal) }}</span
					>
				</p>
				<p class="lead text-primary">
					Grand Total :
					<span class="ml-2 font-weight-normal text-dark"
						>₹ {{ formatPrice((taxTotal + productTotal).toFixed(2)) }}</span
					>
				</p>
				<button
					:disabled="availibilityChecking"
					@click="checkout"
					class="btn mt-1 mb-4 btn-success"
				>
					{{
						!availibilityChecking
							? 'Proceed to Checkout'
							: 'Checking Availibility'
					}}
					<i class="ml-1 fal fa-shopping-cart"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Cart-Page',
	data() {
		return {
			isChanged: false,
			showSaveButton: false,
			loading: false,
			cartSaved: null,
			availibilityChecking: false,
			windowWidth: window.innerWidth,
		};
	},
	mounted() {
		window.onresize = () => {
			this.windowWidth = window.innerWidth;
		};
	},
	watch: {
		isChanged() {
			if (this.isChanged) {
				this.showSaveButton = true;
				window.onbeforeunload = function() {
					return 'Are you sure you want to leave? You are in the middle of something.';
				};
			} else {
				window.onbeforeunload = null;
			}
		},
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
			this.$store.state.cart.forEach(
				(item) => (total += item.price * item.quantity)
			);
			return parseFloat(total.toFixed(2));
		},
		taxTotal() {
			return parseFloat(((this.productTotal * 5) / 100).toFixed(2));
		},
	},
	methods: {
		remove(id) {
			this.$store.commit('REMOVE_CART_ITEM', id);
			if (this.$store.state.cart && this.$store.state.cart.length > 0) {
				this.isChanged = true;
				this.cartSaved = null;
			} else {
				this.isChanged = false;
				this.handleEmptyCart();
			}
		},
		changeQuantity(id, quantity) {
			this.isChanged = true;
			this.cartSaved = null;
			this.$store.commit('CHANGE_ITEM_QUANTITY', { id, quantity });
		},

		// TODO only for Development
		async checkout() {
			try {
				this.availibilityChecking = true;
				if (this.isChanged) {
					await this.handleSaveCart();
				}

				const available = await this.$store.dispatch('checkAvailivility');
				this.availibilityChecking = false;

				if (available) {
					this.$router.push('/checkout/shipping');
				}
			} catch (error) {
				console.error(error);
			}
		},
		// Todo: Change this with Backend ========== Payment methods to be implemented Soon;

		async handleSaveCart() {
			if (this.isChanged) {
				try {
					this.loading = true;
					await this.$store.dispatch('saveCartProduct');
					this.loading = false;
					this.isChanged = false;
					this.cartSaved = true;
				} catch (error) {
					console.error(error);
				}
			}
		},
		handleEmptyCart() {
			this.$store.commit('CLEAR_CART');
			this.$store.dispatch('saveCartProduct');
		},
	},
	beforeRouteLeave(to, from, next) {
		if (this.isChanged) {
			if (confirm('Are you sure you want to leave without Save the Cart ?')) {
				this.isChanged = false;
				next();
			} else {
				return;
			}
		}
		next();
	},
};
</script>

<style scoped>
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

.container {
	margin-bottom: 13.5rem;
}

@media screen and (max-width: 600px) {
	.table thead th {
		font-size: 0.8rem;
	}
}
</style>
