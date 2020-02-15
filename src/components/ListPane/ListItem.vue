<template>
  <div @click="loadChat" class="userbox shared" :class="{selected: selected}">
    <img :src="getProfilePhoto" alt="Photo" class="icon" />
    <div class="container">
      <p class="username shared">{{ fullname }}</p>
      <p class="username condensed">{{ "@" + user.username }}</p>
    </div>
    <div class="badge" :class="{'show': online == true}"></div>
  </div>
</template>

<script>
export default {
  name: "listItem",
  data: function() {
    return {
      fullname: this.user.fname + " " + this.user.lname
    };
  },
  props: {
    user: {},
    selected: Boolean,
    online: Boolean
  },
  methods: {
    loadChat: function() {
      this.$emit("load-chat", this.user.id);
    }
  },
  computed: {
    checkSelected() {
      return this.selected == true;
    },
    getProfilePhoto() {
      var photo;
      if (this.user.image == undefined) {
        photo = require("@/assets/profile.svg");
      }
      return photo;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  flex: 1;
}
.shared {
  font-family: sans-serif;
  font-weight: 500;
  color: #333;
  user-select: none;
}
.condensed {
  color: #268bd2;
  font-weight: bold;
  font-size: 0.8rem;
}
.userbox {
  display: flex;
  align-items: center;
  background: #ddd;
  min-height: 4rem;
  margin: 0.5rem;
  border-radius: 2rem 0 0 2rem;
  margin-right: 0;
  overflow: hidden;
  transition: 0.2s;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
.userbox:first-child {
  margin-top: 0;
}
.selected {
  background: #eee;
}
.username {
  font-family: sans-serif;
  margin: 0;
}
.icon {
  vertical-align: middle;
  height: 3rem;
  border-radius: 50%;
  margin-left: 0.5rem;
}
.badge {
  visibility: hidden;
  height: 0.5em;
  width: 0.5rem;
  margin-right: 1.5rem;
  border-radius: 50%;
  background: #2a91dd;
  right: 1rem;
}
.show {
  visibility: visible;
}
@media screen and (max-width: 700px) {
  .userbox {
    border-radius: 2rem;
    margin: 0.5rem;
  }
}
</style>