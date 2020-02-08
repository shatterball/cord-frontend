<template>
  <div class="list_pane">
    <div class="tab_pane">
      <button class="tabs" onclick="openTab(event, 'UserList')">Chats</button>
      <button class="tabs" onclick="openTab(event, 'Paris')" active>Profile</button>
      <button class="tabs" onclick="openTab(event, 'Tokyo')">Requests</button>
    </div>
    <UserList
      class="tabcontent"
      id="UserList"
      @load-chat="loadChat"
      :usersArray="usersArray"
      :connectedUsers="connectedUsers"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
    />
  </div>
</template>

<script>
import UserList from "./UserList";
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
    UserList
  },
  methods: {
    loadChat: function(id) {
      this.$emit("load-chat", id);
    },
    openTab: function(evt, tab) {
      // var i, tabcontent;
      // tabcontent = document.getElementsByClassName("tabcontent");
      // for (i = 0; i < tabcontent.length; i++)
      //   tabcontent[i].style.display = "none";
      document.getElementById(tab).style.display = "flex";
    }
  }
};
</script>

<style scoped>
.list_pane {
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  width: 30rem;
  background: #ddd;
  transition: 0.2s;
}
.tabcontent {
  flex: 1;
}
.tab_pane {
  align-self: flex-end;
  height: 3.5rem;
  background: #ccc;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.tabs {
  flex: 1;
  background: #ccc;
  border: none;
  transition: 0.2s;
  cursor: pointer;
  outline: none;
}
.tabs:hover {
  background: #ddd;
}
.active {
  background: #ddd;
}
.tabcontent {
  display: none;
}
@media screen and (max-width: 700px) {
  .list_pane {
    width: 100%;
  }
}
</style>