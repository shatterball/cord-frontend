<template>
  <div class="list_pane">
    <div class="search_pane">
      <input type="text" v-$model="searchText" class="search" placeholder="Search" />
    </div>
    <div class="user_list">
      <UserBox
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
import UserBox from "./ListItem";
export default {
  name: "listPane",
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
          item.username.includes(this.searchText.toLowerCase()) ||
          (item.fname.toLowerCase() + " " + item.lname.toLowerCase()).includes(
            this.searchText.toLowerCase()
          )
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
  width: 27rem;
  background: #ddd;
}
.user_list {
  flex: 1;
  overflow: auto;
}
.user_list::-webkit-scrollbar {
  display: none;
}
.search {
  font-family: sans-serif;
  height: 2rem;
  font-size: 1rem;
  padding: 0 1rem;
  width: 100%;
  text-align: center;
  outline: none;
  border: none;
  border-radius: 2rem;
  background: #eee;
  color: #555;
}
.search_pane {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  height: 3.5rem;
}
.button {
  display: none;
  background: #ddd;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  font-size: 1.5rem;
  height: 2.5rem;
  width: 2.5rem;
  color: #888;
  transition: 0.2s;
  text-align: center;
  margin-right: 0.5rem;
  -webkit-tap-highlight-color: transparent;
}
::placeholder {
  color: #888;
}
@media screen and (max-width: 700px) {
  .list_pane {
    width: 100%;
  }
  .button {
    display: block;
  }
}
</style>