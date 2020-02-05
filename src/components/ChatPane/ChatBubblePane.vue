<template>
  <div class="chat_bubble_pane" id="chat_bubble_pane">
    <div class="overlay" v-if="loadingChat" id="loadingChat">
      <div id="loader" class="loader"></div>
    </div>
    <ChatBubble
      v-for="msg in chatArray"
      :type="msg.from == currentUser.id"
      :key="msg._id"
      :msg="msg"
    />
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
.chat_bubble_pane {
  position: relative;
  background: #eee;
  padding: 1rem 5rem;
  overflow: auto;
  overscroll-behavior: none;
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: 0.2s;
}
.chat_bubble_pane::-webkit-scrollbar {
  display: none;
}
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  z-index: 2;
  display: flex;
  justify-content: center;
}
.loader {
  align-self: center;
  border: 0.3rem solid #f3f3f3; /* Light grey */
  border-top: 0.3rem solid #3498db; /* Blue */
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
    height: 50rem;
    margin: 0;
    padding: 1rem;
    padding-bottom: 1rem;
    border-radius: 0;
  }
}
</style>