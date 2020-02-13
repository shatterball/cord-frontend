<template>
  <div class="chat_pane">
    <ChatHeader @show-list="showList" :typingArray="typingArray" :selectedUser="selectedUser" />
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
    typingArray: [],
    currentUser: {},
    selectedUser: {},
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
  transition: 0.2s;
}
</style>
