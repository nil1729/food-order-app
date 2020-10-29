<template>
<div class="container mt-4">
    <div v-if="loading" class="loader text-center">
        <img src="@/assets/view.gif" alt />
    </div>
    <app-not-found v-else-if="!product" />
    <div v-else-if="product">
        <h2 class="text-center text-danger mb-5">{{ product.model }}</h2>
        <div class="row">
            <div class="col-xl-4 col-md-12 text-center">
                <div class="image">
                    <img :src="product.photoURL" alt />
                </div>
            </div>
            <div class="col-xl-8 col-md-12">
                <h3 class="text-muted">Model: <span class="text-dark">{{ product.model }}</span></h3>
                <h5 class="text-muted">
                    Made By
                    <span class="text-dark">{{ product.brand }}</span>
                </h5>
                <h5 class="text-primary">
                    <span class="text-muted">Price:</span>
                    ₹ {{ formatPrice(product.price) }}
                </h5>

                <h5 class="text-muted">
                    Average Rating: 
                    <!--- Star Ratings  --->
                    <div class="reviews stars-outer ml-1">
                        <div class="stars-inner" :style="{'width': `${(product.averageRating/5)*100}%`}"></div>
                    </div>
                </h5>
                <h6 class="text-danger border-bottom border-dark">
                    Some info about the Product
                </h6>
                <p class="text-dark">{{ product.description }}</p>

                <router-link to="/" class="btn btn-outline-primary btn-sm mr-3">
                    <p class="mb-0">Back to Products</p>
                </router-link>
                <button @click="addToCart(product)" class="btn btn-sm btn-outline-warning">
                    <i v-if="!hasCarted(product._id)" class="fa-2x fal fa-cart-arrow-down"></i>
                    <p v-else class="mb-0">In Cart</p>
                </button>

                <div class="container mt-2 review-container">
                    <div  class="text-left my-3">
                        <a href="#" class="text-info" @click.prevent='show_reviews = !show_reviews'>
                            {{show_reviews ? 'Hide Reviews' : 'Show Customer Reviews'}}
                        </a>
                    </div>
                    <div v-if="show_reviews">
                      <div id='add-review-form' class="card bg-light p-4 mb-3">
                        <h3 class="text-dark">Add a Review:</h3>
                        <form @submit.prevent="processReview()">
                            <div class="form-group">
                                <textarea name="review" id="review" rows="4" class="form-control" placeholder="Enter your review" v-model="review.comment"></textarea>
                            </div>
                            <div class="form-group">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineCheckbox1" value="1" v-model="review.stars" />
                                    <label class="form-check-label" for="inlineCheckbox1">1 star</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineCheckbox2" value="2" v-model="review.stars" />
                                    <label class="form-check-label" for="inlineCheckbox2">2 stars</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineCheckbox3" value="3" v-model="review.stars" />
                                    <label class="form-check-label" for="inlineCheckbox3">3 stars</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineCheckbox4" value="4" v-model="review.stars" />
                                    <label class="form-check-label" for="inlineCheckbox4">4 stars</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="inlineCheckbox5" value="5" v-model="review.stars" />
                                    <label class="form-check-label" for="inlineCheckbox5">5 stars</label>
                                </div>
                            </div>
                            <button :disabled="review_processing" type="submit" class="btn btn-success review-btn">
                                {{review_processing ? 'Loading ...' : 'Submit Review'}}
                            </button>
                        </form>
                    </div>
                    <app-product-reviews :productID="this.$route.params.id" />
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import NotFound from "@/components/pages/NotFound.vue";
import ProductReviews from "@/components/layouts/ProductReviews.vue";
export default {
    name: "App-Product-View",
    components: {
        "app-not-found": NotFound,
        "app-product-reviews": ProductReviews,
    },
    computed: {
        ...mapGetters(["formatPrice", "hasCarted"]),
        loading() {
            return this.$store.state.viewProductFetching;
        },
        product() {
            return this.$store.state.viewSingleProduct;
        }
    },
    data() {
        return {
            review: {
                comment: "",
                stars: null
            },
            review_processing: false,
            show_reviews: false,
        };
    },
    async mounted() {
        await this.$store.dispatch("fetchSingleProduct", this.$route.params.id);
    },
    methods: {
        ...mapActions(["addToCart"]),
        async processReview() {
            if (this.review.comment.trim().length === 0 || this.review.stars === null) {
                return;
            }
            this.review_processing = true;
            await this.$store.dispatch("handleReview", {
                review: this.review,
                id: this.product._id
            });
            this.review.comment = '';
            this.review.stars = null;
            this.review_processing = false;
        }
    }
};
</script>

<style scoped>
.image {
    height: 20rem;
}

img {
    height: 100%;
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
    font-size: 0.9em;
    font-weight: 500;
}

.review-btn {
    font-weight: 300 !important;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
}

p {
    line-height: 1.5rem;
    letter-spacing: 0.3px;
}

.review-container {
    max-width: none !important;
    width: 100%;
    padding: 0;
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
</style>
