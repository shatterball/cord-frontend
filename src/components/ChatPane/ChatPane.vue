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
    }
  }
};
</script>

<style scoped>
.chat_pane {
  display: flex;
  flex-direction: column;
  background: #ddd;
  flex: 1;
}
@media screen and (min-width: 700px) {
  .chat_pane {
    border-left: 1px solid #cfcfcf;
  }
}
</style>
