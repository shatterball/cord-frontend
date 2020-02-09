<template>
  <div class="list_pane">
    <ProfileBox @open-profile="openProfile" :currentUser="currentUser" />
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
import ProfileBox from "./ProfileBox";
export default {
  name: "listPane",
  components: {
    UserList,
    ProfileBox
  },
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
  methods: {
    loadChat: function(id) {
      this.$emit("load-chat", id);
    },
    openProfile: function() {
      this.$emit("open-profile");
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