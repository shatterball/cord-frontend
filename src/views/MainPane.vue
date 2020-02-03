<template>
  <div class="main_pane">
    <ListPane
      id="list_pane"
      v-if="showListPane"
      @load-chat="loadChat"
      @hide-list="showChat"
      :connectedUsers="connectedUsers"
      :usersArray="usersArray"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
    />
    <ChatPane
      id="chat_pane"
      v-if="showChatPane"
      @send-message="sendMessage"
      @show-list="showList"
      @logout="logout"
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
      windowHeight: Number,
      usersArray: [],
      connectedUsers: [],
      chatArray: [],
      selectedUser: {},
      currentUser: this.$store.getters.currentUser,
      token: this.$store.getters.token,
      socket: io("apicord.herokuapp.com", { secure: true })
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
      this.chatArray = [];
      Axios.post("https://apicord.herokuapp.com/api/messages/", {
        token: this.token,
        target
      }).then(jsonData => {
        this.chatArray = jsonData.data;
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
      this.chatArray.push(msg);
      this.socket.emit("message-send", msg);
    },
    logout: function() {
      this.socket.disconnect();
      localStorage.removeItem("jwt");
      this.$router.push({ name: "login" });
    }
  },
  beforeCreate: function() {
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
    Axios.post("https://apicord.herokuapp.com/api/users", {
      token: this.token
    }).then(res => {
      this.usersArray = res.data;
    });
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowHeight = window.innerHeight;
        let vh = this.windowHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    });
  },
  created: function() {
    this.socket.emit("login", this.currentUser.id);
    this.socket.on("message-recv", data => {
      if (data.from == this.selectedUser.id) {
        this.chatArray.push(data);
      }
    });
    this.socket.on("online-list", users => {
      Axios.post("https://apicord.herokuapp.com/api/users", {
        token: this.token
      }).then(res => {
        this.usersArray = res.data;
      });
      this.connectedUsers = users;
    });
    if (window.innerWidth < 700) {
      this.showChat();
    }
  },
  beforeDestroy() {
    this.socket.emit("disconnect");
    window.removeEventListener("resize", this.onResize);
  }
};
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
</script>
<style >
.main_pane {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
}
@media screen and (max-width: 700px) {
  #list_pane {
    flex: 1;
  }
  .main_pane {
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>