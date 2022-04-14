<template>
	<div class="container mb-5">
		<h1 class="mt-3 text-center order-text mx-auto mb-4">
			Admin Order Management
		</h1>
		<div v-if="loading" class="order-loader row">
			<img src="@/assets/search.gif" alt="" class="mx-auto" />
		</div>
		<div v-else>
			<h1 v-if="isEmpty" class="text-center order-empty-text mt-5">
				Food Site don't have any order yet
			</h1>
			<div v-else class="mt-3">
				<div
					v-for="order in $store.state.adminOrders"
					:key="order._id"
					class="container border mb-4"
				>
					<h5 class="mt-4 ml-2 order-header pb-1 mb-2">
						OrderID:
						<span class="font-weight-normal">#{{ order._id }}</span>
					</h5>
					<table class="table table-responsive-sm admin-order-table">
						<thead>
							<tr class="text-uppercase">
								<th scope="col" class="lead">Amount Paid</th>
								<th scope="col" class="lead">Transaction ID</th>
								<th scope="col" class="lead">Transaction Time</th>
								<th scope="col" class="lead">Delivered</th>
								<th scope="col" class="lead">Details</th>
							</tr>
						</thead>
						<tbody>
							<th scope="row">
								₹{{ windowWidth > 600 ? '  ' : '' }}{{ formatPrice(order.amount) }}
							</th>
							<td>{{ order.orderID }}</td>
							<td>{{ formatTime(order.transactionTime) }}</td>
							<td class="price">
								<p v-if="!order.isDelivered" class="lead">
									NO
									<button
										:disabled="updateOrderLoading"
										@click="updateOrderStatus(order._id)"
										class="delivery-btn ml-2 btn btn-outline-success"
									>
										<i class="fal fa-check"></i>
									</button>
								</p>
								<p v-if="order.isDelivered">
									{{ formatTime(order.updatedAt) }}
								</p>
							</td>
							<td class="font-weight-bold lead">
								<button
									:id="order._id + '-button'"
									class="btn btn-outline-info"
									@click="openOrderDetail(order._id)"
								>
									Show
								</button>
							</td>
						</tbody>
					</table>
					<div class="order-details hide" :id="order._id + '-detail'">
						<table class="table products-table mt-4 table-responsive-sm">
							<thead>
								<tr class="text-uppercase">
									<th scope="col">food items</th>
									<th scope="col">dish</th>
									<th scope="col">price</th>
									<th scope="col">quantity</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in order.products" :key="item._id">
									<th scope="row">
										<div class="image">
											<img
												:src="item.product.photoURL"
												:alt="item.product._id"
												class="img-thumbnail img-fluid"
											/>
										</div>
									</th>
									<td>
										<router-link :to="'/view/' + item.product._id">{{
											item.product.dish
										}}</router-link>
									</td>
									<td class="price">
										₹{{ windowWidth > 600 ? '  ' : '' }}{{ formatPrice(item.product.price) }}
									</td>
									<td class="font-weight-bold">{{ item.quantity }}</td>
								</tr>
							</tbody>
						</table>
						<div class="row mt-4 mx-2 mb-4">
							<div class="col-md-6 border p-2">
								<h4 class="mx-auto header-detail-order">Customer Details</h4>
								<div class="ml-2">
									<p class="mb-1 text-primary mt-3">
										Name :
										<span class="ml-2 font-weight-normal text-dark">{{
											order.customer.databaseID.details.displayName
										}}</span>
									</p>
									<p class="mb-1 text-primary mt-3">
										Email Address :
										<span class="ml-2 font-weight-normal text-dark">{{
											order.customer.databaseID.details.email
										}}</span>
									</p>
									<p class="mb-1 text-primary mt-3">
										Phone Number :
										<span class="ml-2 font-weight-normal text-dark">{{
											order.customer.databaseID.details.phoneNumber
										}}</span>
									</p>
									<p class="mb-1 text-primary mt-3">
										Static ID :
										<span class="ml-2 font-weight-normal text-dark">{{
											order.customer.databaseID.details.id
										}}</span>
									</p>
									<p class="mb-1 text-primary mt-3">
										Payment Capture ID :
										<span class="ml-2 font-weight-normal text-dark">{{ order.paymentID }}</span>
									</p>
								</div>
							</div>
							<div class="col-md-6 border p-2">
								<h4 class="mx-auto header-detail-order">Shipping Address</h4>
								<div class="ml-2">
									<p class="mb-1 text-primary mt-3">
										Full Name :
										<span class="ml-2 font-weight-normal text-dark">{{
											order.shippingAddress.fullName
										}}</span>
									</p>
									<p class="mb-1 text-primary mt-3">
										Phone Number:
										<span class="ml-2 font-weight-normal text-dark">{{
											order.shippingAddress.phoneNumber
										}}</span>
									</p>
									<p class="mb-1 text-primary mt-3">
										Address :
										<span class="ml-2 font-weight-normal text-dark"
											>{{ order.shippingAddress.address }}, {{ ' ' }}
											{{ order.shippingAddress.landmark }}</span
										>
									</p>
									<p class="mb-1 text-primary mt-3">
										City :
										<span class="ml-2 font-weight-normal text-dark">
											{{ order.shippingAddress.city }}, {{ ' ' }} {{ order.shippingAddress.state }},
											{{ ' ' }} {{ order.shippingAddress.country }}</span
										>
									</p>
									<p class="mb-1 text-primary mt-3">
										Zip Code :
										<span class="ml-2 font-weight-normal text-dark">{{
											order.shippingAddress.zipCode
										}}</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Admin-Orders-View-Page',
	data() {
		return {
			loading: true,
			updateOrderLoading: false,
			windowWidth: window.innerWidth,
		};
	},
	computed: {
		...mapGetters(['formatPrice', 'formatTime']),
		isEmpty: function() {
			return this.$store.state.adminOrders && this.$store.state.adminOrders.length === 0;
		},
	},
	async mounted() {
		await this.$store.dispatch('fetchAdminOrders');
		this.loading = false;
		window.onresize = () => {
			this.windowWidth = window.innerWidth;
		};
	},
	methods: {
		openOrderDetail(id) {
			const details = document.getElementById(`${id}-detail`);
			const button = document.getElementById(`${id}-button`);
			if (details.classList.contains('hide')) {
				details.classList.remove('hide');
				button.innerHTML = 'Hide';
				button.classList.remove('btn-outline-info');
				button.classList.add('btn-warning');
			} else {
				details.classList.add('hide');
				button.innerHTML = 'Show';
				button.classList.remove('btn-warning');
				button.classList.add('btn-outline-info');
			}
		},
		async updateOrderStatus(id) {
			this.updateOrderLoading = true;
			await this.$store.dispatch('updateDeliveryStatus', id);
			this.updateOrderLoading = false;
		},
	},
};
</script>

<style scoped>
.delivery-btn {
	font-size: 1.1rem;
}
h5.order-header {
	border-bottom: 1.5px solid #dee2e6;
	width: fit-content;
	color: blue;
}
.header-detail-order {
	width: fit-content;
	border-bottom: 1.5px solid #dee2e6;
}
.order-text {
	font-weight: 400;
}
.order-text {
	border-bottom: 1px solid grey;
	width: fit-content;
}
table.products-table {
	border: 1px solid #dee2e6;
}

.order-details.hide {
	display: none;
}

.table thead th {
	border-top: none;
}
table.products-table th,
table.products-table td {
	vertical-align: middle;
	text-align: center;
}
.image {
	height: 60px;
	width: 60px;
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
.lead {
	font-weight: 500;
}

@media screen and (max-width: 600px) {
	.order-text {
		font-size: 1.5rem;
	}
	.order-header {
		font-size: 1.1rem;
	}

	th.lead {
		font-size: 0.9rem;
	}
	.price {
		font-size: 0.8rem;
	}
	.price .lead {
		font-size: 0.8rem;
		text-align: center;
	}
	.admin-order-table tbody td {
		font-size: 0.8rem;
	}
}
</style>
