<template>
  <div class="chat_header shared">
    <img @click="showList" class="button shared" src="@/assets/chat.svg" alt="Chats" id="chats" />
    <div class="contact">
      <p class="name shared">{{ trim }}</p>
      <p :class="[typing == true ? 'show' : 'hide' ]" class="typing">Typing...</p>
    </div>
    <img @click="logout" class="button shared" src="@/assets/logout.svg" alt="Chats" id="logout" />
  </div>
</template>
<script>
export default {
  name: "chatHeader",
  props: {
    selectedUser: {},
    typing: Boolean
  },
  data: function() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu: function() {
      this.showMenu = !this.showMenu;
    },
    closePopup: function() {
      this.showMenu = false;
    },
    showList: function() {
      this.$emit("show-list");
    },
    logout() {
      if (confirm("Logout?")) {
        this.$emit("logout");
      }
    }
  },
  computed: {
    trim() {
      if (this.selectedUser.fname != undefined)
        return (
          this.selectedUser.fname +
          " " +
          this.selectedUser.lname
        ).substring(0, 32);
      else return "Empty";
    }
  }
};
</script>

<style scoped>
.show {
  display: block;
  opacity: 1;
}
.hide {
  opacity: 0;
  display: none;
}
.active {
  background: #eee;
}
.shared {
  font-family: sans-serif;
  color: #aaa;
  outline: none;
  margin: 0;
  padding: 0;
  font-weight: 600;
  background: #ddd;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.chat_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
}
.contact {
  margin-left: 1rem;
  transition: 0.2s;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.name {
  color: #444;
  font-weight: 500;
  font-size: 1.3rem;
  text-align: left;
}
.typing {
  transition: 0.2s;
  font-size: 0.7rem;
  font-weight: 500;
  color: #555;
  margin: 0;
  padding: 0;
}
.button {
  color: #888;
  height: 1.8rem;
  width: 1.8rem;
  cursor: pointer;
  transition: 0.2s;
  margin: 0 1rem;
  user-select: none;
}
.button:active {
  transform: scale(0.85);
}
@media screen and (max-width: 700px) {
  .contact {
    margin-left: 0;
  }
  .name {
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }
  .chat_header {
    height: 3.5rem;
  }
}
@media screen and (min-width: 700px) {
  #chats {
    display: none;
  }
}
</style>