<template>
  <div class="list_pane">
    <div class="info">
      <input type="text" v-model="searchText" class="search shadow" placeholder="Search" />
    </div>
    <div class="user_list">
      <UserBox @load-chat="loadChat" v-for="user in filterUsers" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script>
import UserBox from "./UserBox";
export default {
  name: "listPane",
  data: function() {
    return {
      searchText: ""
    };
  },
  props: {
    usersArray: [],
    currentUser: {}
  },
  components: {
    UserBox
  },
  methods: {
    loadChat: function(id) {
      this.$emit("load-chat", id);
    }
  },
  computed: {
    filterUsers() {
      return this.usersArray.filter(
        item =>
          item.username.includes(this.searchText) == true ||
          item.fname.toLowerCase().includes(this.searchText) ||
          item.lname.toLowerCase().includes(this.searchText)
      );
    }
  }
};
</script>

<style scoped>
.list_pane {
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  min-width: 27rem;
  background: #ddd;
}
.user_list {
  flex: 1;
  overflow: auto;
}
.user_list::-webkit-scrollbar {
  display: none;
}
.reset {
  font-family: Roboto;
  color: #93a1a1;
  padding: 0 1rem;
}
.search {
  font-family: Roboto Condensed;
  font-weight: bold;
  height: 2rem;
  font-size: 1rem;
  padding: 0 1rem;
  margin: 0 2rem;
  width: auto;
  flex: 1 0 auto;
  text-align: center;
  border-radius: 2rem;
  outline: none;
  border: none;
  background: #eee;
  transition: 0.2s;
  color: #555;
}
.search:focus {
  margin: 0;
  transition: 0.2s;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 3rem;
}
.shadow {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
}
::placeholder {
  color: #888;
}
@media screen and (max-width: 700px) {
  .list_pane {
    display: none;
  }
}
</style>