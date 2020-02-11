<template>
  <div class="list_pane">
    <UserList
      @load-chat="loadChat"
      :usersArray="usersArray"
      :connectedUsers="connectedUsers"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
    />
    <ProfileBox
      @logout="logout"
      @open-profile="openProfile"
      :currentUser="currentUser"
      class="profile-box"
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
    },
    logout: function() {
      this.$emit("logout");
    }
  }
};
</script>

<style scoped>
.list_pane {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 1 auto;
  width: 30%;
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