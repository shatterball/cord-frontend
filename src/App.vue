<template>
  <div class="app">
    <!-- <router-view /> -->
    <MainPane
      class="main_pane"
      @load-chat="loadChat"
      @send-message="sendMessage"
      :currentUser="currentUser"
      :selectedUser="selectedUser"
      :chatArray="chatArray"
      :usersArray="usersArray"
    />
  </div>
</template>

<script>
import MainPane from "@/components/MainPane";
import Axios from "axios";
import Hash from "sha256";
import io from "socket.io-client";

export default {
  name: "app",
  components: {
    MainPane
  },
  data() {
    return {
      usersArray: [],
      chatArray: [],
      selectedUser: {},
      currentUser: {},
      socket: io("1.1.0.11:3000")
    };
  },
  methods: {
    loadChat: function(id) {
      this.selectedUser = this.usersArray.find(item => item.id == id);
      var username = this.currentUser.username,
        hash = this.currentUser.hash,
        src = this.currentUser.id,
        dest = this.selectedUser.id;

      Axios.post("http://1.1.0.11:3000/api/chats/", {
        username: username,
        hash: hash,
        src: src,
        dest: dest
      }).then(jsonData => {
        this.chatArray = jsonData.data;
      });
    },
    sendMessage: function(msg) {
      msg.msg_id = this.chatArray.length;
      this.chatArray.push(msg);
      this.socket.emit("message-send", msg);
    }
  },
  created: function() {
    Axios.post("http://1.1.0.11:3000/api/login/", {
      username: "kepsake550",
      hash: Hash("kepsake550")
    }).then(res => {
      this.currentUser = res.data;
      this.socket.emit("login", this.currentUser.id);
    });
    Axios.post("http://1.1.0.11:3000/api/users", {
      username: "kepsake550",
      hash: Hash("kepsake550")
    }).then(res => {
      this.usersArray = res.data;
    });
    this.socket.on("message-recv", data => {
      if (data.sender_id == this.selectedUser.id) {
        this.chatArray.push(data);
      }
    });
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.app {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
