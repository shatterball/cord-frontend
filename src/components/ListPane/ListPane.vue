<template>
  <div class="list_pane">
    <UserList
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
  transition: 0.2s;
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