<template>
	<div
		class="toast"
		:class="{ show: error }"
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
	>
		<div class="toast-header">
			<strong class="mr-auto">{{ error && error.code }}</strong>
			<button
				@click="clearError"
				type="button"
				class="ml-2 mb-1 close"
				data-dismiss="toast"
				aria-label="Close"
			>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="toast-body">{{ error && error.message }}</div>
	</div>
</template>

<script>
export default {
	name: 'App-Alert',
	computed: {
		error() {
			return this.$store.state.errors;
		},
	},
	methods: {
		clearError() {
			this.$store.commit('SET_ERRORS', null);
		},
	},
};
</script>

<style scoped>
.toast {
	position: fixed;
	left: 77%;
	top: 5%;
	z-index: 350;
	width: 300px;
	max-width: 300px;
	transition: all ease-in 0.2s;
}
.toast-body {
	background-color: ivory;
}
.toast-header {
	background-color: antiquewhite;
}
.toast.show {
	transition: all ease-in 0.2s;
	right: 2%;
}
button {
	outline: none !important;
}

@media screen and (max-width: 600px) {
	.toast {
		position: fixed;
		left: inherit;
		top: 5%;
		z-index: 350;
		width: 250px;
		max-width: 250px;
		transition: all ease-in 0.2s;
	}
}
</style>
