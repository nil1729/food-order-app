<template>
	<div>
		<app-alert v-if="error" />
		<app-page-loader v-if="loading" />
		<router-view v-else />
		<div @click="goToTop" class="goto-top-btn" ref="goto-top-btn">
			<i class="fad fa-arrow-up"></i>
		</div>
	</div>
</template>

<script>
import Alert from './components/utils/Alerts';
import PageLoader from './components/layouts/PageLoader';

import Vue from 'vue';
import VueMeta from 'vue-meta';

Vue.use(VueMeta);

export default {
	name: 'App-Phone-Store',
	metaInfo: {
		title: 'Food Ordering Web App',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				property: 'og:title',
				content: 'Food Ordering Web App',
			},
			{
				property: 'og:description',
				content: 'Simple food ordering website Using VueJS, firebase, NodeJS and MongoDB.',
			},
			{
				property: 'og:type',
				content: 'food',
			},
			{
				property: 'og:site_name',
				content: 'Simple food ordering website Using VueJS, firebase, NodeJS and MongoDB.',
			},
			{
				name: 'keywords',
				content: 'food, vuejs, firebase, nodejs, mongodb',
			},
			{
				name: 'copyright',
				content: 'Food Ordering Web App',
			},
			{
				property: 'language',
				content: 'en',
			},
			{
				property: 'revisit-after',
				content: '3 days',
			},
			{
				property: 'coverage',
				content: 'Worldwide',
			},
			{
				property: 'summary',
				content: 'Simple food ordering website Using VueJS, firebase, NodeJS and MongoDB.',
			},
			{
				property: 'robots',
				content: 'index, follow',
			},
		],
	},
	computed: {
		loading() {
			return this.$store.state.pageLoading;
		},
		error() {
			return this.$store.state.errors;
		},
	},
	watch: {
		'$store.state.user': function() {
			if (!this.$store.state.user) {
				this.$router.push('/login');
			}
		},
	},
	methods: {
		scrollFunction() {
			const gotoTopBtn = this.$refs['goto-top-btn'];
			if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
				gotoTopBtn.style.display = 'flex';
			} else {
				gotoTopBtn.style.display = 'none';
			}
		},
		goToTop() {
			document.getElementById('navbar__header').scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			});
		},
	},
	components: {
		'app-alert': Alert,
		'app-page-loader': PageLoader,
	},
	created() {
		window.onscroll = () => {
			this.scrollFunction();
		};
	},
};
</script>

<style>
/* total width */
::-webkit-scrollbar {
	background-color: #fff;
	width: 16px;
}
/* background of the scrollbar except button or resizer */
::-webkit-scrollbar-track {
	background-color: #fff;
}
::-webkit-scrollbar-track:hover {
	background-color: #f4f4f4;
}
/* scrollbar itself */
::-webkit-scrollbar-thumb {
	background-color: #babac0;
	border-radius: 16px;
	border: 5px solid #fff;
}
::-webkit-scrollbar-thumb:hover {
	background-color: #a0a0a5;
	border: 4px solid #f4f4f4;
}
/* set button(top and bottom of the scrollbar) */
::-webkit-scrollbar-button {
	display: none;
}

body {
	overflow-x: hidden;
}

.goto-top-btn {
	position: fixed;
	z-index: 304;
	bottom: 10px;
	right: 10px;
	font-size: 1.5rem;
	background: #d2d2d691;
	height: 3rem;
	width: 3rem;
	border-radius: 50%;
	display: none;
	justify-content: center;
	align-items: center;
	border: 1px solid #bebec0;
	cursor: pointer;
	transition: ease-in-out 0.3s;
}

@media screen and (max-width: 600px) {
	.goto-top-btn {
		font-size: 1.3rem;
		height: 2.3rem;
		width: 2.3rem;
	}
}
</style>
