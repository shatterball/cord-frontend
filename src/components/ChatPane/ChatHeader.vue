<template>
  <div class="chat_header shared">
    <img @click="showList" class="button shared" src="@/assets/back.svg" id="chats" />
    <img @click="showList" class="shared" src="@/assets/profile.svg" id="icon" />
    <div class="contact">
      <p class="name shared">{{ trim }}</p>
      <p :class="[typing == true ? 'show' : 'hide' ]" class="typing">Typing...</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "chatHeader",
  props: {
    selectedUser: {},
    typingArray: []
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
      else return "Devcord";
    },
    typing() {
      return this.typingArray.includes(this.selectedUser.id);
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
  transition: 0.2s;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 1rem;
}
.name {
  color: #444;
  font-weight: 500;
  font-size: 1rem;
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
  height: 1.3rem;
  width: 1.3rem;
  cursor: pointer;
  transition: 0.2s;
  margin: 0 1rem;
  margin-right: 0.5rem;
  user-select: none;
}
.button:active {
  transform: scale(0.85);
}
#icon {
  height: 2.5rem;
  width: 2.5rem;
  margin-left: 1rem;
}
@media screen and (max-width: 700px) {
  .name {
    font-size: 1rem;
  }
  #icon {
    margin-left: 0rem;
  }
}
@media screen and (min-width: 700px) {
  #chats {
    display: none;
  }
}
</style>