<template>
  <div class="chat_pane">
    <ChatHeader :selectedUser="selectedUser" />
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
</style>
