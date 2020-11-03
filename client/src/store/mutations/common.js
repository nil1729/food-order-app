export default {
	SET_PAGE_LOADING(state, payload) {
		state.pageLoading = payload;
	},

	SET_SHIPPING_ADDRESS: function(state) {
		const shippingData = localStorage.getItem('SHIPPING_ADDRESS');
		if (shippingData) {
			state.shippingAddress = JSON.parse(shippingData);
		} else {
			state.shippingAddress = {
				phoneNumber: (state.user && state.user.phoneNumber) || '',
				fullName: state.user && state.user.displayName,
				address: '',
				landmark: '',
				city: '',
				state: '',
				zipCode: '',
				country: 'Choose ...',
			};
		}
	},

	SET_ERRORS(state, error) {
		state.errors = error;
	},
};
