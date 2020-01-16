<template>
  <div class="main_pane">
    <ListPane
      id="list_pane"
      @load-chat="loadChat"
      @toggle-list="toggleList"
      :usersArray="usersArray"
      :currentUser="currentUser"
    />
    <ChatPane
      id="chat_pane"
      @send-message="sendMessage"
      @load-list="loadList"
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
  data: function() {
    return {
      isListOpen: true
    };
  },
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
      if (window.innerWidth < 700) {
        document.getElementById("list_pane").style.display = "none";
        document.getElementById("chat_pane").style.display = "flex";
      }
      this.$emit("load-chat", id);
    },
    loadList: function() {
      document.getElementById("list_pane").style.display = "flex";
      document.getElementById("chat_pane").style.display = "none";
    },
    toggleList: function() {
      document.getElementById("list_pane").style.display = "none";
      document.getElementById("chat_pane").style.display = "flex";
    },
    sendMessage: function(message) {
      this.$emit("send-message", message);
    }
  }
};
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
</script>
<style >
/* @font-face {
  font-family: Roboto;
  src: url("../assets/din.ttf");
} */
.main_pane {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
  flex: 1 1 auto;
}
@media screen and (max-width: 700px) {
  #chat_pane {
    display: none;
  }
  #list_pane {
    display: flex;
    flex: 1;
  }
  .main_pane {
    max-height: calc(var(--vh, 1vh) * 100);
  }
}
</style>