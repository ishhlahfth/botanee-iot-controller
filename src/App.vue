<template>
  <router-view />
</template>
<script>
import { useToast } from "vue-toastification";
export default {
  name: "App",
  components: {},
  setup(){
    const toast = useToast();
    return {
      toast
    };
  }
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
body {
  background-color: #fffaff;
}
</style>
