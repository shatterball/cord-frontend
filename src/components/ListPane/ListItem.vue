<template>
  <div @click="loadChat" class="userbox shared" :class="{selected: selected}">
    <img :src="getProfilePhoto" alt="Photo" class="icon" />
    <div class="ultra">
      <div class="container">
        <p class="username shared">{{ fullname }}</p>
        <p class="username condensed">{{ "@" + user.username }}</p>
      </div>
      <div class="badge" :class="{'show': online == true}"></div>
    </div>
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
.ultra {
  display: flex;
  height: 4.5rem;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  justify-content: space-between;
  flex: 1;
}
.container {
  display: flex;
  flex-direction: column;
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
  background: #eee;
  min-height: 4.5rem;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  transition: 0.2s;
}
.userbox:last-child .ultra {
  border-bottom-color: #eee;
}
.selected {
  background: #e0e0e0;
}
.username {
  font-family: sans-serif;
  font-weight: bold;
  margin: 0;
}
.icon {
  vertical-align: middle;
  height: 3rem;
  border-radius: 50%;
  margin: 0 1rem;
}
.badge {
  visibility: hidden;
  height: 0.5em;
  width: 0.5rem;
  margin-right: 1.3rem;
  border-radius: 50%;
  background: #2a91dd;
  right: 1rem;
}
.show {
  visibility: visible;
}
@media screen and (max-width: 700px) {
  .selected {
    background: initial;
  }
}
</style>