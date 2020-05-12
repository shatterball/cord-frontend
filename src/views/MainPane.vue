<template>
  <div class="main_pane">
    <div class="overlay" id="overlay">
      <div id="loader" class="loader"></div>
    </div>
    <ListPane
      id="list_pane"
      @load-chat="loadChat"
      @open-profile="openProfile"
      @logout="logout"
      :connectedUsers="connectedUsers"
      :usersArray="usersArray"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
    />
    <ChatPane
      id="chat_pane"
      @send-message="sendMessage"
      @show-list="showList"
      @typing="typingEmit"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
      :chatArray="chatArray"
      :loadingChat="loadingChat"
      :typingArray="typingArray"
    />
    <Sidebar
      @close-sidebar="closeSidebar"
      :isPanelOpen="isPanelOpen"
      :sidebarHeader="sidebarHeader"
    >
      <Profile @logout="logout" v-if="showProfile" :user="currentUser" />
    </Sidebar>
  </div>
</template>

<script>
import ListPane from "../components/ListPane/ListPane";
import ChatPane from "../components/ChatPane/ChatPane";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import Axios from "axios";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
var apiUri = "https://apicord.herokuapp.com";
export default {
  name: "mainPane",
  components: {
    ListPane,
    ChatPane,
    Sidebar,
    Profile
  },
  data() {
    return {
      showChatPane: true,
      showProfile: false,
      windowHeight: Number,
      tabFocus: Boolean,
      isPanelOpen: false,
      loadingChat: false,
      usersArray: [],
      connectedUsers: [],
      chatArray: [],
      typingArray: [],
      selectedUser: Object,
      sidebarHeader: String,
      currentUser: this.$store.getters.currentUser,
      token: this.$store.getters.token,
      socket: io(apiUri, {
        secure: true
      })
    };
  },
  methods: {
    loadChat: function(id) {
      if (window.innerWidth < 700) {
        this.showChat();
      }
      this.selectedUser = this.usersArray.find(item => item.id == id);
      this.loadingChat = true;
      Axios.post(apiUri + "/api/messages/", {
        token: this.token,
        target: this.selectedUser.id
      })
        .then(jsonData => {
          this.chatArray = jsonData.data;
          this.loadingChat = false;
        })
        .then(() => {
          var ids = [];
          this.chatArray.forEach(el => {
            if (el.from == this.selectedUser.id) {
              ids.push(el._id);
            }
          });
          this.socket.emit(
            "message-r",
            ids,
            this.selectedUser.id,
            this.currentUser.id
          );
        });
    },
    showChat: function() {
      this.showChatPane = true;
      document.getElementById("list_pane").style.transform =
        "translateX(-100%)";
    },
    showList: function() {
      this.showChatPane = false;
      document.getElementById("list_pane").style.transform = "translateX(0)";
    },
    sendMessage: function(msg) {
      this.socket.emit("message-send", msg);
      this.chatArray.push(msg);
    },
    logout: function() {
      if (confirm("Sure wanna logout?")) {
        this.socket.disconnect();
        localStorage.removeItem("jwt");
        this.$router.push({ name: "login" });
      }
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
    },
    openProfile: function() {
      this.showProfile = true;
      this.isPanelOpen = true;
      this.sidebarHeader = "Profile";
    },
    closeSidebar: function() {
      this.isPanelOpen = false;
      this.showProfile = false;
    }
  },
  beforeCreate: function() {
    this.$store.commit("setToken", localStorage.getItem("jwt"));
    if (this.$store.getters.token == undefined) {
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
    if (window.innerWidth < 700) {
      this.showChatPane = false;
    }
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
    setInterval(() => {
      if (!this.socket.connected && !this.socket.connecting) {
        this.socket.emit("login", this.currentUser.id);
      }
    }, 1000);
    this.socket.emit("login", this.currentUser.id);
    this.socket.on("message-recv", data => {
      if (data.from == this.selectedUser.id) {
        var ids = [];
        ids.push(data._id);
      }
      var found = this.chatArray.some(el => el._id == data._id);
      if (
        (data.from == this.selectedUser.id ||
          (data.from == this.currentUser.id &&
            data.to == this.selectedUser.id)) &&
        !found
      ) {
        if (this.showChatPane)
          this.socket.emit("message-r", ids, data.from, this.currentUser.id);
        this.chatArray.push(data);
      }
      if (
        (data.from != this.selectedUser.id || !this.tabFocus) &&
        data.from != this.currentUser.id &&
        !this.showChatPane
      ) {
        var sentBy = this.usersArray.find(user => {
          return user.id == data.from;
        }).fname;
        Notification.requestPermission().then(result => {
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
      if (data.status == true) {
        this.typingArray.push(data.from);
      } else {
        this.typingArray = this.typingArray.filter(el => {
          el.id == data.from;
        });
      }
    });
    this.socket.on("message-d", id => {
      this.chatArray.forEach(el => {
        if (el._id == id) {
          el.status = 1;
        }
      });
    });
    this.socket.on("message-rn", (ids, sentBy) => {
      if (sentBy == this.selectedUser.id) {
        var i = 0;
        for (i = 0; i < this.chatArray.length; i++) {
          if (ids.includes(this.chatArray[i]._id)) {
            this.chatArray[i].status = 2;
          }
        }
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
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background: #eee;
  z-index: 2;
  display: flex;
  flex-direction: column;
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
.list_pane {
  display: flex;
  flex-direction: column;
  background: #eee;
  width: 30%;
  transition: 0.2s;
}
@media screen and (max-width: 700px) {
  .chat_pane {
    position: absolute;
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
  }
  .list_pane {
    position: absolute;
    width: 100vw;
    z-index: 1;
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>