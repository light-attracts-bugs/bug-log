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
      <router-link :to="{name: 'bug', params: {bugId: bug.id}}">{{bug.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  // mounted() {
  //   this.$store.dispatch("getBugs");
  //   console.log();
  // },
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
      this.newBug = { title: "", description: "" };
    }
  }
};
</script>
