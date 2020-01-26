<template>
  <div class="list_pane">
    <div class="search_pane">
      <button class="button" @click="hideList">
        <font-awesome icon="arrow-left" />
      </button>
      <input type="text" v-$model="searchText" class="search shadow" placeholder="Search" />
    </div>
    <div class="user_list">
      <UserBox
        @load-chat="loadChat"
        v-for="user in filterUsers"
        :online="connectedUsers.includes(user.id)"
        :key="user.id"
        :user="user"
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
    currentUser: {},
    connectedUsers: []
  },
  components: {
    UserBox
  },
  methods: {
    loadChat: function(id) {
      this.$emit("load-chat", id);
    },
    hideList: function() {
      this.$emit("hide-list");
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
.reset {
  font-family: Roboto;
  color: #93a1a1;
  padding: 0 1rem;
}
.search {
  font-family: Roboto;
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
.search_pane {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
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
  min-width: 2.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  color: #888;
  transition: 0.2s;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
}
.button:active {
  background: #c8c8c8;
}
::placeholder {
  color: #888;
}
@media screen and (max-width: 700px) {
  .list_pane {
    width: 100%;
  }
  .search {
    margin: 0;
  }
  .button {
    display: block;
  }
}
</style>