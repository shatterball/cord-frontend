<template>
  <div class="chat_pane">
    <ChatHeader @logout="logout" @show-list="showList" :selectedUser="selectedUser" />
    <ChatBubblePane :chatArray="chatArray" :currentUser="currentUser" :selectedUser="selectedUser" />
    <InputPane @send-message="sendMessage" :currentUser="currentUser" :selectedUser="selectedUser" />
  </div>
</template>

<script>
import ChatHeader from "./ChatHeader";
import InputPane from "./InputPane";
import ChatBubblePane from "./ChatBubblePane";
export default {
  name: "chatPane",
  props: {
    chatArray: [],
    currentUser: {},
    selectedUser: {}
  },
  components: {
    ChatBubblePane,
    InputPane,
    ChatHeader
  },
  methods: {
    sendMessage: function(message) {
      this.$emit("send-message", message);
    },
    showList: function() {
      this.$emit("show-list");
    },
    logout: function() {
      this.$emit("logout");
    }
  }
};
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
</script>

<style scoped>
.chat_pane {
  display: flex;
  flex-direction: column;
  background: #ddd;
  flex: 1;
  overflow: auto;
}
@media screen and (max-width: 700px) {
  .chat_pane {
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>
