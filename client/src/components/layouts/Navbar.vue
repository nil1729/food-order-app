<template>
	<div class="navbar-div">
		<nav class="navbar navbar-expand-lg navbar-dark">
			<div class="text-light navbar-brand">
				<i @click="openNavbar" class="mb-show fa-2x fal fa-hamburger"></i>
				<i class="mb-hide fa-2x fad fa-burger-soda"></i>
				<router-link to="/" class="text-light lead ml-2 mb-nav-title mb-show"
					>Food Site</router-link
				>
			</div>

			<div class="mb-show">
				<ul class="navbar-nav align-items-center">
					<li class="nav-item">
						<router-link
							to="/search"
							type="button"
							class="p-0 btn text-light"
							id="add-btn"
						>
							<i class="fal fa-search"></i>
						</router-link>
						<router-link
							to="/cart"
							type="button"
							id="add-btn"
							class="p-0 ml-3 btn text-light"
						>
							<i class="fas fa-cart-plus"></i>
							<span class="badge badge-light mb-badge">{{
								cartItems === 0 ? '' : cartItems
							}}</span>
						</router-link>
					</li>
				</ul>
			</div>

			<div class="mb-hide">
				<ul class="navbar-nav mr-auto">
					<router-link tag="li" to="/" exact class="nav-item active">
						<a class="nav-link lead">Food Site</a>
					</router-link>
				</ul>
			</div>

			<div class="ml-auto mb-hide">
				<ul class="navbar-nav mr-auto ml-5 align-items-center">
					<li class="nav-item">
						<router-link
							to="/search"
							type="button"
							class="btn mr-2 btn-outline-light"
							id="add-btn"
						>
							<i class="fal fa-search"></i>
							Search
						</router-link>
					</li>
					<li v-if="$store.state.isAdmin" class="nav-item">
						<router-link
							to="/admin/add-product"
							type="button"
							class="btn mr-2 btn-info"
							id="add-btn"
						>
							<i class="fad fa-utensils-alt"></i>
							Add Food
						</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/cart" type="button" class="btn" id="cart-btn">
							<i class="fas fa-cart-plus"></i>
							My Cart
							<span class="badge badge-light">{{
								cartItems === 0 ? '' : cartItems
							}}</span>
						</router-link>
					</li>
					<li class="nav-item dropdown">
						<a
							@click="dropdownOpen = !dropdownOpen"
							class="nav-link dropdown-toggle p-0"
							href="javascript:void(0)"
						>
							<img
								id="user-dp"
								:src="photoURL"
								alt="Phone Store"
								loading="lazy"
							/>
						</a>
						<div
							class="dropdown-menu"
							:style="{ display: `${dropdownOpen ? 'block' : 'none'}` }"
						>
							<span class="dropdown-item text-info">{{ displayName }}</span>
							<router-link
								@click="dropdownOpen = false"
								class="dropdown-item"
								to="/profile"
								>Your Profile</router-link
							>
							<router-link
								@click="dropdownOpen = false"
								class="dropdown-item"
								to="/profile/orders"
								>Your Orders</router-link
							>
							<router-link
								@click="dropdownOpen = false"
								class="dropdown-item"
								to="/admin"
								v-if="$store.state.isAdmin"
								>Admin Panel</router-link
							>
							<router-link
								@click="dropdownOpen = false"
								class="dropdown-item"
								to="/profile/settings"
								>Settings</router-link
							>
							<div class="dropdown-divider"></div>
							<span @click="callSignOut" class="dropdown-item text-danger"
								>Sign out</span
							>
						</div>
					</li>
				</ul>
			</div>
		</nav>
		<!-- Mobile Navbar -->
		<div id="mb-nav" class="overlay">
			<a href="#" @click.prevent="closeNavbar" class="closebtn">&times;</a>
			<div class="overlay-content">
				<img id="user-dp" :src="photoURL" alt="Phone Store" loading="lazy" />
				<h4 class="text-light mt-2 mb-3">{{ displayName }}</h4>

				<router-link to="/profile">Your Profile</router-link>

				<div v-if="$store.state.isAdmin">
					<router-link to="/admin">Admin Panel</router-link>
					<router-link to="/admin/add-product">
						<i class="fad fa-utensils-alt"></i>
						Add Food
					</router-link>
				</div>
				<router-link to="/profile/orders">Your Orders</router-link>
				<router-link to="/profile/settings">Settings</router-link>
				<p @click="callSignOut" class="text-warning mt-2">
					Sign out
				</p>
			</div>
		</div>
		<!-- Mobile Navbar -->
	</div>
</template>

<script>
export default {
	name: 'App-Navbar',
	data() {
		return {
			dropdownOpen: false,
		};
	},
	watch: {
		$route() {
			this.dropdownOpen = false;
			this.closeNavbar();
		},
	},
	methods: {
		async callSignOut() {
			this.closeNavbar();
			this.$store.dispatch('userSignOut');
			this.$store.dispatch('clearAllState');
		},
		openNavbar() {
			if (window.innerWidth < 600) {
				document.getElementById('mb-nav').style.width = '100%';
				document.body.style.overflowY = 'hidden';
			}
		},
		closeNavbar() {
			document.getElementById('mb-nav').style.width = '0%';
			document.body.style.overflowY = 'auto';
		},
	},
	computed: {
		photoURL: function() {
			return this.$store.state.user && this.$store.state.user.photoURL;
		},
		displayName: function() {
			return this.$store.state.user && this.$store.state.user.displayName;
		},
		cartItems: function() {
			return this.$store.state.cart && this.$store.state.cart.length;
		},
	},
};
</script>

<style scoped>
.navbar-div {
	position: sticky;
	top: 0;
	z-index: 300;
}
.navbar-brand {
	margin-left: 2rem;
}
.navbar-toggler {
	display: none;
}
nav {
	background-color: #3f99ff;
}
.nav-link.lead {
	font-family: 'Red Rose', cursive;
	font-size: 1.5rem;
	letter-spacing: 1.5px;
}
.dropdown-menu {
	left: -7rem;
	top: 2.5rem;
}

button {
	outline: none !important;
	box-shadow: none !important;
}
.btn {
	box-shadow: none !important;
}
#cart-btn {
	border: 1.5px solid rgb(218, 208, 208);
	color: rgb(250, 250, 250);
}
#cart-btn i,
#add-btn i {
	font-size: 1.3rem;
	margin-right: 5px;
}
#cart-btn,
#add-btn {
	font-size: 1.1rem;
}
#user-dp {
	height: 35px;
	width: 35px;
	border-radius: 50%;
	margin-left: 1rem;
}
.dropdown-item.text-danger {
	cursor: pointer;
}
.mb-show {
	display: none;
}
@media screen and (max-width: 600px) {
	.mb-hide {
		display: none;
	}
	.mb-show {
		display: initial;
	}
	.navbar-brand {
		margin-left: 0rem;
	}
	.navbar-toggler {
		display: block;
	}
	.mb-nav-title {
		font-size: 1.5rem;
		font-weight: 500;
		font-family: 'Red Rose', cursive;
		text-decoration: none;
	}
	#add-btn {
		position: relative;
	}
	.mb-badge {
		position: absolute;
		border-radius: 50%;
		top: -8px;
		right: -6px;
		background: bisque;
	}
	#user-dp {
		height: 75px;
		width: 75px;
		margin-left: 0;
	}
}
/* The Overlay (background) */
.overlay {
	/* Height & width depends on how you want to reveal the overlay (see JS below) */
	height: 100%;
	width: 0;
	position: fixed; /* Stay in place */
	z-index: 301; /* Sit on top */
	left: 0;
	top: 0;
	background-color: rgb(0, 0, 0); /* Black fallback color */
	background-color: rgba(0, 0, 0, 0.9); /* Black w/opacity */
	overflow-x: hidden; /* Disable horizontal scroll */
	transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}

/* Position the content inside the overlay */
.overlay-content {
	position: relative;
	top: 25%; /* 25% from the top */
	width: 100%; /* 100% width */
	text-align: center; /* Centered text/links */ /* 30px top margin to avoid conflict with the close button on smaller screens */
}

/* The navigation links inside the overlay */
.overlay a {
	padding: 5px;
	text-decoration: none;
	font-size: 20px;
	color: #818181;
	display: block; /* Display block instead of inline */
	transition: 0.3s; /* Transition effects on hover (color) */
}

/* When you mouse over the navigation links, change their color */
.overlay a:hover,
.overlay a:focus {
	color: #f1f1f1;
}

/* Position the close button (top right corner) */
.overlay .closebtn {
	position: absolute;
	top: 20px;
	right: 45px;
	font-size: 60px;
}

.overlay p {
	font-size: 20px;
	letter-spacing: 0.5px;
	font-weight: 500;
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
@media screen and (max-height: 450px) {
	.overlay a {
		font-size: 20px;
	}
	.overlay .closebtn {
		font-size: 40px;
		top: 15px;
		right: 35px;
	}
}
</style>
