<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'App',
		methods: {
			...mapActions(["getBaseDm"])
		},
		created() {
			this.getBaseDm();
		},
	}
</script>

<style>
	* {margin: 0;}
	a {text-decoration: none;}
	img {position: relative;vertical-align: text-bottom;}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	#nav {
		padding: 30px;
	}
	#nav a.router-link-exact-active {
		color: #42b983;
	}
</style>
