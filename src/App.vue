<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <TopBar/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <NavBar/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import NavBar from "./components/NavBar";
import TopBar from "@/components/TopBar.vue";
// import TopBar from "./components/TopBar";

export default {
  name: 'App',
  components: {
    TopBar,
    // TopBar,
    NavBar,
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
