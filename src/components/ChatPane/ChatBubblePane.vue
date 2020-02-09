<template>
  <div class="wrapper_pane">
    <div class="overlay" v-if="loadingChat" id="loadingChat">
      <div id="loader" class="loader"></div>
    </div>
    <div class="chat_bubble_pane" id="chat_bubble_pane">
      <ChatBubble
        v-for="msg in chatArray"
        :type="msg.from == currentUser.id"
        :key="msg._id"
        :msg="msg"
      />
    </div>
  </div>
</template>

<script>
import ChatBubble from "./ChatBubble";
export default {
  name: "chatBubblePane",
  data: function() {
    return {
      targetUser: this.selectedUser
    };
  },
  props: {
    chatArray: [],
    currentUser: {},
    selectedUser: {},
    loadingChat: Boolean
  },
  components: {
    ChatBubble
  },
  updated() {
    var chatBubblePane = document.getElementById("chat_bubble_pane");
    chatBubblePane.scrollTop = chatBubblePane.scrollHeight;
  }
};
</script>

<style scoped>
.wrapper_pane {
  position: relative;
  overflow: auto;
  flex: 1;
  display: flex;
}
.chat_bubble_pane {
  position: relative;
  padding: 0.5rem 0;
  background: #eee;
  overflow: auto;
  overscroll-behavior: none;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #eee;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  border: 0.3rem solid #f3f3f3;
  border-top: 0.3rem solid #268bd2;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 700px) {
  .chat_bubble_pane {
    margin: 0;
  }
}
</style>