<template>
  <div class="main_pane">
    <ListPane @load-chat="loadChat" :usersArray="usersArray" :currentUser="currentUser" />
    <ChatPane
      @send-message="sendMessage"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
      :chatArray="chatArray"
    />
  </div>
</template>

<script>
import ListPane from "./ListPane/ListPane";
import ChatPane from "./ChatPane/ChatPane";
export default {
  name: "mainPane",
  props: {
    usersArray: [],
    chatArray: [],
    currentUser: {},
    selectedUser: {}
  },
  components: {
    ListPane,
    ChatPane
  },
  methods: {
    loadChat: function(id) {
      this.$emit("load-chat", id);
    },
    sendMessage: function(message) {
      this.$emit("send-message", message);
    }
  }
};
</script>
<style scoped>
.main_pane {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
  flex: 1 1 auto;
}
</style>