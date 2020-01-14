<template>
  <div class="chat_header shared">
    <button class="button shared" id="chats">
      <font-awesome icon="comments" />
    </button>
    <p class="name shared">{{ trimName }}</p>
    <div>
      <button
        class="button"
        id="settings"
        @click="toggleMenu"
        :class="[showMenu == true ? 'active' : 'inactive']"
      >
        <font-awesome icon="chevron-down" />
      </button>
      <div class="dropdown-content" :class="[showMenu == true ? 'show' : 'hide']">
        <p class="option">Profile</p>
        <p class="option">Logout</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "chatHeader",
  data: function() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu: function() {
      this.showMenu = !this.showMenu;
    }
  },
  computed: {
    trimName() {
      var fullname;
      if (this.selectedUser.fname != undefined)
        fullname = this.selectedUser.fname + " " + this.selectedUser.lname;
      else fullname = "Empty";
      if (fullname.length > 24) {
        fullname = fullname.substring(0, 24) + "...";
      }
      return fullname;
    }
  },
  props: {
    selectedUser: {}
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
  visibility: hidden;
}
.active {
  background: #cfcfcf;
}
.shared {
  font-family: Roboto;
  color: #aaa;
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
  height: 3rem;
}
.name {
  color: #555;
  flex: 1 0 auto;
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
}
.button {
  color: #888;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  transition: 0.2s;
  margin: 0 1rem;
  text-align: center;
  border: none;
  border-radius: 50%;
  outline: none;
}
.dropdown {
  position: relative;
}
.dropdown-content {
  transition: 0.2s;
  font-size: 0.8rem;
  color: #555;
  font-weight: bold;
  margin-left: -2rem;
  position: absolute;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
  min-width: 5rem;
}
.option {
  padding: 0.5rem 1rem;
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
  .name {
    font-size: 1rem;
    /* padding-left: 1rem; */
  }
  .chat_header {
    height: 3rem;
  }
  .dropdown-content {
    margin-left: -1rem;
    margin-top: 1rem;
  }
}
@media screen and (min-width: 700px) {
  #chats {
    visibility: hidden;
  }
}
</style>