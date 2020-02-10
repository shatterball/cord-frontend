<template>
  <div class="container">
    <div class="search_pane">
      <input type="search" v-$model="searchText" class="search" placeholder="Search chats" />
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
.user_list {
  flex: 1;
  overflow: auto;
}
.user_list::-webkit-scrollbar {
  display: none;
}
.search {
  font-family: sans-serif;
  font-size: 1rem;
  padding: 0 1rem;
  height: 3rem;
  width: 100%;
  text-align: center;
  outline: none;
  border: none;
  background: #eee;
  color: #444;
}
.search_pane {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
}
::placeholder {
  color: #888;
}
</style>
