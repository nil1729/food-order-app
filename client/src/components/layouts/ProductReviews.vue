<template>
<div class="container mb-5">
    <div >
        <h3 class="mb-3 mt-4 text-info">
            Customer Reviews
        </h3>
        <div v-if="loading" class="container text-center">
            <img src="@/assets/search.gif" alt="Loader" />
        </div>
        <div v-else-if='$store.state.productReviews'>
            <p v-if="$store.state.productReviews.reviews.length === 0" class="lead text-center">
                No Reviews Found for this Product.
            </p>
            <div v-else class="list-group">
                <div v-for="review in $store.state.productReviews.reviews" :key='review._id' class="list-group-item list-group-item-action flex-column align-items-start p-3">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="customer-profile d-flex justify-content-center align-items-center">
                            <img class='img-fluid' :src="review.customer.details.photoURL" alt="">
                            <div>
                                <h6 class='ml-2 mb-0'>{{ review.customer.details.displayName }}</h6>
                                <!--- Star Ratings  --->
                                <div class="reviews stars-outer ml-2">
                                    <div class="stars-inner" :style="{'width': `${(review.stars/5)*100}%`}"></div>
                                </div>
                            </div>
                        </div>
                        <small class='text-primary'>{{ formatTime(review.commentedAt).split(',')[0] }}</small>
                    </div>
                    <p class="mb-1 mt-2">
                        {{ review.comment }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    name: "Product-Review-Section",
    props: ["productID"],
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        ...mapGetters(['timeDuration', 'formatTime']),
    },
    async mounted() {
        document.getElementById('add-review-form').scrollIntoView({behavior: "smooth", block: 'center', inline: 'center'});
        try {
            this.loading = true;
            await this.$store.dispatch("fecthProductReviews", this.productID);
            this.loading = false;
        } catch (error) {
            console.error(error);
        }
    },
}
</script>

<style scoped>
h6 {
    font-weight: 500;
    color: black;
}

.container {
    max-width: none;
    width: 100%;
    padding: 0;
}

h3 {
    width: fit-content;
    margin: auto;
    border-bottom: 1px solid grey;
}
.customer-profile img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
}
</style>
