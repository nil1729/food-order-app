<template>
	<div class="container">
		<div class="jumbotron py-2 bg-light">
			<h1 class="text-center">
				Serach Foods
			</h1>
			<form @submit.prevent="handleSearching">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text" id="inputGroup-sizing-default">
							<i class="fal fa-search"></i>
						</span>
					</div>
					<input
						required
						v-model="text"
						type="text"
						placeholder="Serach Food Items ..."
						class="form-control"
						aria-label="Default"
						aria-describedby="inputGroup-sizing-default"
					/>
				</div>
				<div class="row">
					<div class="col-md-6">
						<p class="lead text-info">
							Apply Filters <i class="fad fa-filter"></i>
						</p>
					</div>
					<div class="col-md-6">
						<p
							@click="clearFilters"
							class="lead text-danger ml-auto clear-fliter"
						>
							Clear Filters <i class="ml-2 fal fa-times"></i>
						</p>
					</div>
				</div>

				<div class="form-row">
					<div class="form-group col-md-4">
						<label>Selct Category</label>
						<select required class="form-control" v-model="category">
							<option disabled>Choose ...</option>
							<option v-for="it in foodCategories" :key="it">{{ it }}</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<label>Selct Restaurant</label>
						<select required class="form-control" v-model="restaurant">
							<option disabled>Choose ...</option>
							<option v-for="it in restaurants" :key="it"> {{ it }}</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<label>Price Range</label>
						<div class="input-group mb-2 mr-sm-2">
							<div class="input-group-prepend">
								<div class="input-group-text">Upto Rs.</div>
							</div>
							<input
								v-model="price"
								required
								type="number"
								min="1"
								class="form-control"
								placeholder="100"
							/>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-5">
						<div class="custom-control custom-switch">
							<label class="form-check-label">
								<input
									v-model="stockedItems"
									class="form-check-input"
									type="checkbox"
								/>
								Show only Stocked in Food Items
							</label>
						</div>
					</div>
					<div class="form-group col-md-4">
						<button class="btn btn-success px-2">
							<i class="fal fa-file-search"></i>
							{{ searching ? 'Serching ...' : 'Search' }}
						</button>
					</div>
				</div>
			</form>
		</div>
		<div class="row" v-if="searching">
			<img src="@/assets/search.gif" alt="" class="mx-auto" />
		</div>
		<div v-else-if="!initialState">
			<h2 class="text-center mb-1 text-info font-weight-bold">
				Serach Results
			</h2>
			<p
				v-if="results && results.mathedFound > 0"
				class="text-center text-muted mb-3 lead"
			>
				{{ results && results.mathedFound }} Results found
			</p>
			<div class="row mb-3 justify-content-center">
				<h3
					v-if="results && results.mathedFound === 0"
					class="mx-auto order-empty-text"
				>
					No matching foods found
				</h3>
				<div
					v-for="item in results.results"
					:key="item._id"
					class="col-xl-3 col-lg-4 col-md-6 col-xs-12 mb-4"
				>
					<app-product-item :product="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProductItem from '../layouts/ProductItem';
export default {
	name: 'Serach-Foods',
	components: {
		'app-product-item': ProductItem,
	},
	computed: {
		results() {
			return this.$store.state.searchResults;
		},
	},
	data() {
		return {
			searching: false,
			text: '',
			category: 'Choose ...',
			restaurant: 'Choose ...',
			price: 100,
			stockedItems: true,
			restaurants: ['Looters', 'ANC', 'Pizzeria', 'Tott'],
			foodCategories: [
				'Burgers',
				'Pizza',
				'Drinks',
				'Rolls',
				'Momos',
				'Ice Cream',
				'Noodles',
			],
			initialState: true,
		};
	},
	methods: {
		checkToggleButton() {
			this.stockedItems = !this.stockedItems;
		},
		clearFilters() {
			this.stockedItems = false;
			this.price = 100;
			this.category = 'Choose ...';
			this.restaurant = 'Choose ...';
		},
		async handleSearching() {
			this.searching = true;

			if (this.text.trim().length === 0) {
				return;
			}

			let query = `text=${this.text}`;

			if (this.category !== 'Choose ...') {
				query += `&category=${this.category}`;
			}

			if (this.restaurant !== 'Choose ...') {
				query += `&category=${this.restaurant}`;
			}

			query += `&price=${this.price}`;

			query += `&stocked=${this.stockedItems}`;

			await this.$store.dispatch('fecthSearchResults', query);

			this.searching = false;
			this.initialState = false;
		},
	},
};
</script>

<style scoped>
input,
select,
label,
button {
	box-shadow: none !important;
}
.custom-switch {
	padding-left: 1.5rem;
}
.clear-fliter {
	cursor: pointer;
	width: fit-content;
}

.container {
	width: 90%;
	max-width: none;
}

.jumbotron {
	margin-right: 5%;
	margin-left: 5%;
}

@media screen and (max-width: 600px) {
	.container {
		width: 100%;
		max-width: none;
	}
	.jumbotron {
		margin-right: 0%;
		margin-left: 0%;
	}
}
</style>
