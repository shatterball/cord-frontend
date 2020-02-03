<template>
  <div class="chat_header shared">
    <img @click="showList" class="button shared" src="@/assets/chat.svg" alt="Chats" id="chats" />
    <div class="contact">
      <p class="name shared">{{ trim }}</p>
      <p :class="[typing == true ? 'show' : 'hide' ]" class="typing">Typing...</p>
    </div>
    <div>
      <button
        class="button"
        id="hamburger"
        @click="toggleMenu"
        v-click-outside="closePopup"
        :class="[showMenu == true ? 'active' : 'inactive']"
      >
        <font-awesome icon="bars" />
      </button>
      <div class="dropdown-content shadow" :class="[showMenu == true ? 'show' : 'hide']">
        <p @click="logout" class="option">Logout</p>
      </div>
    </div>
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
      this.$emit("logout");
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
  margin: 0;
  padding: 0;
}
.button {
  color: #888;
  border: none;
  outline: none;
  border-radius: 50%;
  height: 1.8rem;
  width: 1.8rem;
  cursor: pointer;
  transition: 0.2s;
  margin: 0 1rem;
}
#hamburger {
  font-size: 1.4rem;
  height: 2.5rem;
  width: 2.5rem;
}
.dropdown-content {
  transition: 0.2s;
  font-size: 0.8rem;
  color: #555;
  font-weight: bold;
  margin-left: -2rem;
  margin-top: 0.2rem;
  position: absolute;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  min-width: 5rem;
}
.option {
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0.25rem 0;

  text-align: left;
}
.option:hover {
  background: #ddd;
  color: #555;
}
.option:first-child {
  margin-top: 0.5rem;
}
.option:last-child {
  margin-bottom: 0.5rem;
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
    height: 3rem;
  }
  .dropdown-content {
    margin-left: -1rem;
    margin-top: 1rem;
  }
  .button {
    font-size: 1.5rem;
  }
}
@media screen and (min-width: 700px) {
  #chats {
    display: none;
  }
}
</style>