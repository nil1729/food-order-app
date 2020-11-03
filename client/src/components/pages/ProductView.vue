<template>
	<div class="container mt-4">
		<div v-if="loading" class="loader text-center">
			<img src="@/assets/view.gif" alt />
		</div>
		<app-not-found v-else-if="!product" />
		<div v-else-if="product">
			<h2 class="text-center text-info mb-5">{{ product.dish }}</h2>
			<div class="row">
				<div class="col-xl-5 col-md-12 text-center">
					<div class="image">
						<img :src="product.photoURL" alt />
					</div>
				</div>
				<div class="col-xl-7 col-md-12 m-auto">
					<h4
						class="font-weight-bold text-center stock-text"
						:class="[
							{ 'text-success': product.stock > 0 },
							{ 'text-danger': product.stock <= 0 },
						]"
					>
						{{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
					</h4>
					<h5 class="text-info">
						Dish offered from:
						<span class="text-dark font-weight-bold">{{
							product.restaurant
						}}</span>
					</h5>
					<h5 class="text-info">
						Price:
						<span class="text-dark font-weight-bold"
							>₹ {{ formatPrice(product.price) }}</span
						>
					</h5>

					<h5 class="text-info">
						Average Rating:
						<!--- Star Ratings  --->
						<div class="reviews stars-outer ml-1">
							<div
								class="stars-inner"
								:style="{ width: `${(product.averageRating / 5) * 100}%` }"
							></div>
						</div>
					</h5>
					<h6 class="text-info border-bottom border-dark">
						Dish Descriptions
					</h6>
					<p class="text-dark">{{ product.description }}</p>
					<div class="row mx-0">
						<button
							:disabled="product.stock <= 0"
							@click="addToCart(product)"
							class="btn"
							:class="[
								{ 'btn-outline-warning': product.stock > 0 },
								{ 'btn-danger': product.stock <= 0 },
							]"
						>
							<span v-if="!hasCarted(product._id) && product.stock > 0"
								>Add to Cart <i class="fal fa-cart-arrow-down"></i
							></span>
							<span v-else-if="product.stock <= 0">Out of Stock</span>
							<span v-else class="mb-0">In Cart</span>
						</button>
						<router-link
							v-if="$store.state.isAdmin"
							:to="'/admin/product/' + product._id + '/update'"
							class="ml-4 btn btn-outline-primary"
						>
							Update Dish <i class="ml-1 fal fa-utensil-fork"></i>
						</router-link>
					</div>

					<div class="mt-2">
						<div class="text-left my-3">
							<a
								href="#"
								class="text-info"
								@click.prevent="show_reviews = !show_reviews"
							>
								{{ show_reviews ? 'Hide Reviews' : 'Show Customer Reviews' }}
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="container review-container">
				<div v-if="show_reviews">
					<div id="add-review-form" class="card bg-light p-4 mb-3">
						<h3 class="text-dark">Add a Review:</h3>
						<form @submit.prevent="processReview()">
							<div class="form-group">
								<textarea
									name="review"
									id="review"
									rows="4"
									class="form-control"
									placeholder="Enter your review"
									v-model="review.comment"
									required
								></textarea>
							</div>
							<div class="form-group">
								<div class="form-check form-check-inline">
									<input
										class="form-check-input"
										type="radio"
										id="inlineCheckbox1"
										value="1"
										v-model="review.stars"
										required
									/>
									<label class="form-check-label" for="inlineCheckbox1"
										>1 star</label
									>
								</div>
								<div class="form-check form-check-inline">
									<input
										class="form-check-input"
										type="radio"
										id="inlineCheckbox2"
										value="2"
										v-model="review.stars"
										required
									/>
									<label class="form-check-label" for="inlineCheckbox2"
										>2 stars</label
									>
								</div>
								<div class="form-check form-check-inline">
									<input
										class="form-check-input"
										type="radio"
										id="inlineCheckbox3"
										value="3"
										v-model="review.stars"
										required
									/>
									<label class="form-check-label" for="inlineCheckbox3"
										>3 stars</label
									>
								</div>
								<div class="form-check form-check-inline">
									<input
										class="form-check-input"
										type="radio"
										id="inlineCheckbox4"
										value="4"
										v-model="review.stars"
										required
									/>
									<label class="form-check-label" for="inlineCheckbox4"
										>4 stars</label
									>
								</div>
								<div class="form-check form-check-inline">
									<input
										class="form-check-input"
										type="radio"
										id="inlineCheckbox5"
										value="5"
										v-model="review.stars"
										required
									/>
									<label class="form-check-label" for="inlineCheckbox5"
										>5 stars</label
									>
								</div>
							</div>
							<div class="form-btn-container">
								<button
									:disabled="review_processing"
									type="submit"
									class="btn btn-success review-btn"
								>
									{{ review_processing ? 'Loading ...' : 'Submit Review' }}
								</button>
							</div>
						</form>
					</div>
					<app-product-reviews :productID="this.$route.params.id" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NotFound from '@/components/pages/NotFound.vue';
import ProductReviews from '@/components/layouts/ProductReviews.vue';
export default {
	name: 'App-Product-View',
	components: {
		'app-not-found': NotFound,
		'app-product-reviews': ProductReviews,
	},
	computed: {
		...mapGetters(['formatPrice', 'hasCarted']),
		loading() {
			return this.$store.state.viewProductFetching;
		},
		product() {
			return this.$store.state.viewSingleProduct;
		},
	},
	data() {
		return {
			review: {
				comment: '',
				stars: null,
			},
			review_processing: false,
			show_reviews: false,
		};
	},
	async mounted() {
		await this.$store.dispatch('fetchSingleProduct', this.$route.params.id);
		if (this.$route.hash && this.$route.hash.split('#')[1] === 'feedback') {
			this.show_reviews = true;
		}
	},
	methods: {
		...mapActions(['addToCart']),
		async processReview() {
			this.$store.commit('SET_ERRORS', null);
			if (
				this.review.comment.trim().length === 0 ||
				this.review.stars === null
			) {
				return this.$store.commit('SET_ERRORS', {
					code: 'Notification',
					message: 'Please rate your review to submit',
				});
			}
			this.review_processing = true;
			await this.$store.dispatch('handleReview', {
				review: this.review,
				id: this.product._id,
			});
			this.review.comment = '';
			this.review.stars = null;
			this.review_processing = false;
		},
	},
};
</script>

<style scoped>
.image {
	height: 20rem;
}

.image img {
	height: 100%;
	width: 100%;
}

h2,
h6,
h5 {
	font-weight: 400;
}

h6 {
	width: fit-content;
	padding-bottom: 2px;
	margin-bottom: 5px;
}

.btn {
	box-shadow: none !important;
	border-radius: 5px;
	font-weight: 500;
}

.review-btn {
	font-weight: 300 !important;
	letter-spacing: 0.5px;
	font-size: 0.9rem;
}
.review-container {
	margin-top: 1.5rem;
	padding: 0 3rem;
}
p {
	line-height: 1.5rem;
	letter-spacing: 0.3px;
}

textarea {
	box-shadow: none !important;
}
.reviews {
	font-size: 1rem;
}
a {
	font-size: 1.1rem;
}

@media screen and (max-width: 600px) {
	.image {
		height: 15rem;
		width: 18rem;
		margin: auto;
	}
	.stock-text {
		margin: 12px auto 10px;
	}
	.review-container {
		max-width: none !important;
		width: 100%;
		padding: 0;
	}
	.form-check-inline {
		display: block;
	}
	/* .form-btn-container {
		text-align: center;
	} */
}
</style>
