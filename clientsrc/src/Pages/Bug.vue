<template>
  <div class="bug bg-secondary container-fluid">
    <p>"{{bug.description}}"</p>
    <div class="row justify-content-around">
      <note v-for="note in notes" :noteData="note" :key="note._id"></note>
    </div>
    <div class="row mt-5">
      <div class="col-12 pb-5">
        <form @submit.prevent="addNote">
          <input type="text" placeholder="title" v-model="newNote.title" required />
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Note from "../components/Note";
export default {
  name: "bug",
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
      return this.$store.state.activeBug;
    },
    profile() {
      return this.$store.state.profile;
    }
  },

  methods: {
    addNote() {
      // this.$store.dispatch("addBug", this.newBug);
      // this.newBug = { title: "", description: "" };
      this.newNote.bugId = this.$route.params.bugId;
      this.newNote.creatorEmail = this.bug.creatorEmail;
      console.log("this.newNote in Bug.vue");
      console.log(this.newNote);
      this.$store.dispatch("addNote", this.newNote);
      this.newNote = {};
    },
    editBug() {
      this.$store.dispatch("editBug", this.bug);
      this.editing = false;
      this.edit = false;
    },
    closeBug() {
      if (confirm("confirm close bug")) {
        this.bug.closed = true;
        this.$store.dispatch("editBug", this.bug);
      }
    }
  },
  mounted() {
    this.$store.dispatch("getNotesByBugId", this.$route.params.bugId);
    this.$store.dispatch("getActiveBug", this.$route.params.bugId);
    this.$store.dispatch("getProfile");
  },
  props: ["bugData"],
  components: { Note }
};
</script>