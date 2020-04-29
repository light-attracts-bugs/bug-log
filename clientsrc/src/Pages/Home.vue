<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to Your Vue.js App</h1>
    <form @submit.prevent="addBug">
      <input type="text" placeholder="title" v-model="newBug.title" required />
      <input type="text" placeholder="description" v-model="newBug.description" required />
      <button type="submit">Create Bug</button>
    </form>
    <div v-for="bug in bugs" :key="bug.id" :bug="bug">
      <template v-if="bug.closed == true">
      <router-link :to="{name: 'bug', params: {bugId: bug.id}}"><del>{{bug.title}}</del></router-link>
      <p><del>{{bug.description}}</del></p>
      <p><del>{{bug.updatedAt}}</del></p>
      </template>
      <template v-else>
      <router-link :to="{name: 'bug', params: {bugId: bug.id}}">{{bug.title}}</router-link>
      <p>{{bug.description}}</p>
      <p>{{bug.updatedAt}}</p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBugs");
    console.log();
    
  },
  data() {
    return {
      newBug: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
    methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      // console.log(newBug)
      this.newBug = { title: "", description: "" };
    }
  }
};
</script>

<style scoped>

</style>
