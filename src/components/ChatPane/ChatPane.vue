<template>
  <div class="chat_pane">
    <ChatHeader
      @logout="logout"
      @show-list="showList"
      :selectedUser="selectedUser"
      :typing="typing"
    />
    <ChatBubblePane
      ref="chatBubblePane"
      :chatArray="chatArray"
      :loadingChat="loadingChat"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
    />
    <InputPane
      @send-message="sendMessage"
      @typing="typingEmit"
      @scrollChat="scrollChat"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
    />
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
    selectedUser: {},
    typing: Boolean,
    loadingChat: Boolean
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
    },
    typingEmit: function(status) {
      this.$emit("typing", status);
    },
    scrollChat: function() {
      this.$refs.chatBubblePane.$forceUpdate();
    }
  }
};
</script>

<style scoped>
.chat_pane {
  display: flex;
  width: 100vw;
  flex-direction: column;
  background: #ddd;
  flex: 1;
  overflow: auto;
}
</style>
