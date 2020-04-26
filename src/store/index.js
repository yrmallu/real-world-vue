import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: ". ..", done: false }
    ],
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(response => {
          commit("SET_EVENTS", response.data);
        })
        .catch(error => {
          console.log("The error is" + error.response);
        });
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length;
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    activeTodoCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
    activeTodos: state => {
      return state.todos.filter(todo => !todo.done);
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  },
  modules: {}
});
