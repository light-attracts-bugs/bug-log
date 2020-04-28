<template>
  <div class="board bg-secondary container-fluid">
    <div class="row justify-content-around">
      <!-- <h1 v-if="board.title">{{board.title}}</h1>
      <h1 v-else>Loading...</h1>-->
      <list v-for="note in notes" :key="note.id" :noteData="note"></list>
    </div>
    <div class="row mt-5">
      <div class="col-12 pb-5">
        <form @submit.prevent="addList">
          <input type="text" placeholder="title" v-model="newNote.title" required />
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import note from "../components/Note";
export default {
  name: "bug",
  props: ["bug"],
  data() {
    return {
      newNote: {}
    };
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    },
    bug() {
      //FIXME This does not work on page reload because the activeBug is empty in the store
      return this.$store.state.activeBoard;
    }
  },

  methods: {
    addNote() {
      this.newNote.bugId = this.$route.params.bugdId;
      console.log("this.newNote in Bug.vue")
      console.log(this.newNote);
      this.$store.dispatch("addNote", this.newNote);
      this.newList = {};
    }
  },
  mounted() {
    this.$store.dispatch("getNotes", this.$route.params.bugId);
  },
  props: ["bugId"],
  components: { note }
};
</script>