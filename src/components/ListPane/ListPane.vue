<template>
  <div class="list_pane">
    <ProfileBox
      @logout="logout"
      @open-profile="openProfile"
      :currentUser="currentUser"
      class="profile-box"
    />
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
    },
    logout: function() {
      this.$emit("logout");
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 700px) {
  .list_pane {
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.15), 0 3px 3px rgba(0, 0, 0, 0.25);
  }
  .button {
    display: block;
  }
}
</style>