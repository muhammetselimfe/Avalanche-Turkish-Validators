<template>
  <Header/>
  <Table />
</template>

<script>
import Table from "./components/Home.vue";
import Header from "./components/Header.vue"

export default {
  name: "App",
  components: {
    Table,
    Header
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
