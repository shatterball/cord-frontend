<template>
  <div class="main_pane">
    <ListPane
      id="list_pane"
      v-if="showListPane"
      @load-chat="loadChat"
      @hide-list="showChat"
      :usersArray="usersArray"
      :currentUser="currentUser"
    />
    <ChatPane
      id="chat_pane"
      v-if="showChatPane"
      @send-message="sendMessage"
      @show-list="showList"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
      :chatArray="chatArray"
    />
  </div>
</template>

<script>
import ListPane from "../components/ListPane/ListPane";
import ChatPane from "../components/ChatPane/ChatPane";
import Axios from "axios";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
export default {
  name: "mainPane",
  data() {
    return {
      showChatPane: true,
      showListPane: true,
      usersArray: [],
      chatArray: [],
      selectedUser: {},
      currentUser: this.$store.getters.currentUser,
      token: this.$store.getters.token,
      socket: io("1.1.0.10:3000")
    };
  },
  components: {
    ListPane,
    ChatPane
  },
  methods: {
    loadChat: function(id) {
      if (window.innerWidth < 700) {
        this.showChat();
      }
      this.selectedUser = this.usersArray.find(item => item.id == id);
      var target = this.selectedUser.id;
      Axios.post("http://1.1.0.10:3000/api/chats/", {
        token: this.token,
        target
      }).then(jsonData => {
        this.chatArray = jsonData.data;
        localStorage.setItem("last", this.selectedUser.id);
      });
    },
    showChat: function() {
      this.showListPane = false;
      this.showChatPane = true;
    },
    showList: function() {
      this.showListPane = true;
      this.showChatPane = false;
    },
    sendMessage: function(msg) {
      msg.msg_id = this.chatArray.length;
      this.chatArray.push(msg);
      this.socket.emit("message-send", msg);
    }
  },
  created: function() {
    this.$store.commit("setToken", localStorage.getItem("jwt"));
    if (this.$store.getters.token == undefined) {
      this.$router.push({ name: "login" });
    }
    if (Date.now() >= jwtDecode(this.$store.getters.token).exp * 1000) {
      this.$router.push({ name: "login" });
    }
    this.$store.commit(
      "setCurrentUser",
      jwtDecode(this.$store.getters.token).user
    );
    this.currentUser = this.$store.getters.currentUser;
    this.token = this.$store.getters.token;

    if (this.currentUser.username == undefined) {
      this.$router.push({ name: "login" });
    }
    Axios.post("http://1.1.0.10:3000/api/users", {
      token: this.token
    }).then(res => {
      this.usersArray = res.data;
      var lastSelectedUser = localStorage.getItem("last");
      if (lastSelectedUser != undefined) {
        this.loadChat(parseInt(lastSelectedUser, 10));
      }
    });
    this.socket.emit("login", this.currentUser.id);
    this.socket.on("message-recv", data => {
      if (data.sender_id == this.selectedUser.id) {
        this.chatArray.push(data);
      }
    });
    if (window.innerWidth < 700) {
      this.showChat();
    }
  }
};

let vh = window.innerHeight;
document.documentElement.style.setProperty("--vh", `${vh}px`);
</script>
<style >
.main_pane {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
  /* flex: 1; */
}
@media screen and (max-width: 700px) {
  #list_pane {
    flex: 1;
  }
  .main_pane {
    min-height: calc(var(--vh, 1vh));
  }
}
</style>