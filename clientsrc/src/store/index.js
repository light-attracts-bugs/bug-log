import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    notes: [],
    activeBug: {},
    activeNote: {},
    activeNotes: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
    setActiveBug(state, bug) {
      state.activeBug = bug;
    },
    setActiveNote(state, note) {
      state.activeNote = note;
    },
    setActiveNotes(state, notes) {
      state.activeNotes = notes;
    },
    setNotes(state, notes) {
      state.notes = notes;
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- BUGS --
    async getBugs({ commit, dispatch }) {
      let res = await api.get("bugs");
      commit("setBugs", res.data);
    },
    async addBug({ commit, dispatch }, bugData) {
      let res = await api.post("bugss", bugData);
      dispatch("getBugs");
    },
    async getActiveBug({ commit, dispatch }, bug) {
      try {
        let res = await api.get("bugs/" + bug);
        commit("setActiveBug", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editBug({ commit, dispatch }, bug) {
      try {
        await api.put("boards/" + bug.id, bug);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBug({ commit, dispatch }, bugId) {
      try {
        await api.delete("bugs/" + bugId);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- NOTES --
    async getNotesByBugId({ commit, dispatch }, bugId) {
      try {
        let res = await api.get("bugs/" + bugId + "/notes");
        commit("setTasks", { bugId, tasks: res.data });
      } catch (err) {
        console.error(err);
      }
    },
    async addNote({ commit, dispatch }, newNote) {
      try {
        let res = await api.post("bugs/", newNote);
        dispatch("getTasks", newNote.bugId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote({ commit, dispatch }, noteId) {
      try {
        await api.delete("notes/" + noteId);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
  }
  });
