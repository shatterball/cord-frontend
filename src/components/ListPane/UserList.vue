<template>
  <div class="container">
    <div class="search_pane">
      <input type="searchbox" v-$model="searchText" class="search" placeholder="Search chats" />
    </div>
    <div class="user_list">
      <ListItem
        @load-chat="loadChat"
        v-for="user in filterUsers"
        :online="connectedUsers.includes(user.id)"
        :key="user.id"
        :user="user"
        :selected="selectedUser.id == user.id"
      />
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem";
export default {
  name: "UserList",
  data: function() {
    return {
      searchText: ""
    };
  },
  props: {
    usersArray: [],
    connectedUsers: [],
    currentUser: {},
    selectedUser: {}
  },
  components: {
    ListItem
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
          item.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.fname.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.lname.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
};
</script>
<style scoped>
.search {
  font-family: sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0 1rem;
  margin: 0 1rem;
  height: 2rem;
  flex: 1;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 2rem;
  background: #eee;
  color: #444;
}
.container {
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.search_pane {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #e0e0e0;
  height: 2.5rem;
}
.user_list {
  flex: 1;
  overflow: scroll;
  overscroll-behavior: none;
  display: flex;
  flex-direction: column;
}
::placeholder {
  color: #888;
}
</style>
