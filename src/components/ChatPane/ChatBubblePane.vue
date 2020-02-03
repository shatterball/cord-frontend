<template>
  <div class="chat_bubble_pane">
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
    selectedUser: {}
  },
  components: {
    ChatBubble
  },
  updated() {
    var elem = this.$el;
    elem.scrollTop = elem.scrollHeight;
  }
};
</script>

<style scoped>
.chat_bubble_pane {
  background: #eee;
  padding: 1rem 3rem;
  border-radius: 0.2rem;
  margin: 0 1rem;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: 0.2s;
}
.chat_bubble_pane::-webkit-scrollbar {
  display: none;
}
@media screen and (max-width: 700px) {
  .chat_bubble_pane {
    height: 50rem;
    margin: 0;
    padding: 1rem;
    border-radius: 0;
  }
}
</style>