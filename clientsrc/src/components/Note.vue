<template>
  <div class="note row bg-light m-2 rounded shadow">
    <div class="col-12 my-2">
      <div class="row text-right">
        <div class="col-12">
          <!-- <button type="submit">
            <i class="fas fa-pencil-alt text-warning"></i>
          </button>-->
          <p>{{noteData.content}}</p>
          <p>{{profile.name}}</p>
          <button class="btn btn-sm" @click="deleteNote()" v-if="bug.closed == false">
            <i class="fas fa-trash-alt text-danger"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <!-- <p>"{{noteData.body}}"</p> -->
          <!-- <p class="text-right">-{{noteData.creatorName}}</p> -->
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
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    bug() {
      return this.$store.state.activeBug;
    }
  },
  methods: {
    deleteNote() {
      if (confirm("are you sure you want to delete this note?")) {
        this.$store.dispatch("deleteNote", this.noteData);
        // this.$store.dispatch("getNotes", this.noteData.bugId);
      }
    }
  },
  components: {}
};
</script>


<style scoped>
</style>