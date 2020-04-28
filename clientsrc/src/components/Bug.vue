<template>
  <div class="bug bg-danger text-center mx-1 my-3 col-3 rounded shadow">
    <div class="row text-center">
      <div class="col-12 text-right">
        <div
          class="btn-group rounded mt-1 text-right shadow"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button type="button" class="btn btn-info" @click="deleteBug()">Delete Bug</button>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 text-center">
        <h1 class="bg-success p-0 rounded shadow text-light">{{bugData.title}}</h1>
      </div>
    </div>
  </div>
</template>


<script>
// import task from "../components/Task.vue";
export default {
  name: "bug",
  data() {
    return {
      newTask: {}
    };
  },
  props: ["bugData"],
  computed: {},
  methods: {
    deleteBug() {
      this.$store.dispatch("deleteBug", this.bugData);
      // this.$store.dispatch("getComments", this.commentData.taskId);
    }
  },
  // mounted() {
  //   this.$store.dispatch("getTasks", this.listData.id);
  // },
  components: { note }
};
</script>


<style scoped>
</style>