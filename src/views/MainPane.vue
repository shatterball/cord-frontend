<template>
  <div class="main_pane">
    <div class="overlay" id="overlay">
      <div id="loader" class="loader"></div>
    </div>
    <ListPane
      id="list_pane"
      @load-chat="loadChat"
      :connectedUsers="connectedUsers"
      :usersArray="usersArray"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
    />
    <ChatPane
      id="chat_pane"
      @send-message="sendMessage"
      @show-list="showList"
      @logout="logout"
      @typing="typingEmit"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
      :chatArray="chatArray"
      :typing="typing"
      :loadingChat="loadingChat"
    />
  </div>
</template>

<script>
import ListPane from "../components/ListPane/ListPane";
import ChatPane from "../components/ChatPane/ChatPane";
import Axios from "axios";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
var apiUri = "https://apicord.herokuapp.com";
export default {
  name: "mainPane",
  data() {
    return {
      showChatPane: true,
      showListPane: true,
      windowHeight: Number,
      tabFocus: Boolean,
      typing: false,
      loadingChat: false,
      usersArray: [],
      connectedUsers: [],
      chatArray: [],
      selectedUser: {},
      currentUser: this.$store.getters.currentUser,
      token: this.$store.getters.token,
      socket: io(apiUri, {
        secure: true
      })
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
      this.loadingChat = true;
      Axios.post(apiUri + "/api/messages/", {
        token: this.token,
        target
      }).then(jsonData => {
        this.chatArray = jsonData.data;
        this.loadingChat = false;
      });
    },
    showChat: function() {
      document.getElementById("chat_pane").style = "display: flex";
      document.getElementById("list_pane").style = "display: none";
    },
    showList: function() {
      document.getElementById("list_pane").style = "display: flex";
      document.getElementById("chat_pane").style = "display: none";
    },
    sendMessage: function(msg) {
      this.socket.emit("message-send", msg);
      this.chatArray.push(msg);
    },
    logout: function() {
      this.socket.disconnect();
      localStorage.removeItem("jwt");
      this.$router.push({ name: "login" });
    },
    typingEmit: function(status) {
      this.socket.emit("typing", {
        from: this.currentUser.id,
        to: this.selectedUser.id,
        status
      });
    },
    setFocus: function() {
      this.tabFocus = document.hasFocus();
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
    Axios.post(apiUri + "/api/users", {
      token: this.token
    }).then(res => {
      this.usersArray = res.data;
      document.getElementById("overlay").style.display = "none";
    });
  },
  mounted() {
    if (window.innerWidth < 700)
      document.getElementById("chat_pane").style = "display:none";
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowHeight = window.innerHeight;
        let vh = this.windowHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    });
    document.addEventListener("visibilitychange", this.setFocus);
  },
  created() {
    this.socket.emit("login", this.currentUser.id);
    this.socket.on("message-recv", data => {
      if (
        data.from == this.selectedUser.id ||
        (data.from == this.currentUser.id && data.to == this.selectedUser.id)
      ) {
        this.chatArray.push(data);
      }
      var sentBy;
      if (
        (data.from != this.selectedUser.id || !this.tabFocus) &&
        data.from != this.currentUser.id
      ) {
        for (let i = 0; i < this.usersArray.length; i++) {
          if (this.usersArray[i].id == data.from) {
            sentBy = this.usersArray[i].fname + " " + this.usersArray[i].lname;
          }
        }
        Notification.requestPermission().then(function(result) {
          if (result == "granted") {
            new Notification(sentBy, {
              body: data.content,
              icon: undefined
            });
          }
        });
      }
    });
    this.socket.on("online-list", users => {
      Axios.post(apiUri + "/api/users", {
        token: this.token
      }).then(res => {
        this.usersArray = res.data;
      });
      this.connectedUsers = users;
    });
    this.socket.on("typing", data => {
      if (this.selectedUser.id == data.from) {
        this.typing = data.status;
      }
    });
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
.overlay {
  position: fixed;
  height: 100vh;
  width: 100vw;
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
  #list_pane {
    flex: 1;
  }
  .main_pane {
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>