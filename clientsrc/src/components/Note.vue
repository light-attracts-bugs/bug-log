<template>
  <div class="note row bg-light m-2 rounded shadow">
    <div class="col-12 my-2">
      <div class="row text-right">
        <div class="col-12">
          <!-- <button type="submit">
            <i class="fas fa-pencil-alt text-warning"></i>
          </button>-->
          <button class="btn btn-sm" @click="deleteNote()">
            <i class="fas fa-trash-alt text-danger"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <p>"{{noteData.body}}"</p>
          <p class="text-right">-{{noteData.creatorName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "note",
  data() {
    return {};
  },
  props: ["noteData"],
  computed: {},
  methods: {
    deleteNote() {
      this.$store.dispatch("deleteNote", this.noteData);
      //this.$store.dispatch("getComments", this.comment.taskId);
      this.$store.dispatch("getComments", this.noteData.bugId);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>