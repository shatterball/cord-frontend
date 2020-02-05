<template>
  <div @click="loadChat" class="userbox shared" :class="{selected: selected == true}">
    <div class="image_container">
      <div v-if="online" class="badge"></div>
      <img :class="{male: user.sex == 1,female: user.sex == 0}" class="icon" />
    </div>
    <div class="container">
      <p class="username shared">{{ fullname }}</p>
      <p class="username condensed">{{ "@" + user.username }}</p>
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
    online: Boolean,
    selected: Boolean
  },
  methods: {
    loadChat: function() {
      this.$emit("load-chat", this.user.id);
    }
  },
  computed: {
    trim(string) {
      return string.substring(0, 32) + "...";
    },
    checkSelected() {
      return this.selected == true;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  padding-left: 0;
}
.shared {
  font-family: sans-serif;
  font-weight: bold;
  color: #555;
  user-select: none;
}
.male {
  content: url("../../assets/contact-male.png");
}
.female {
  content: url("../../assets/contact-female.png");
}
.shadow {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
}
.condensed {
  color: #268bd2;
  font-family: Roboto Condensed;
  font-weight: bold;
  font-size: 0.8rem;
}
.userbox {
  display: flex;
  align-items: center;
  margin: 1rem;
  border-bottom: 0;
  border-radius: 2rem;
  background: #eee;
  height: 4rem;
  overflow: hidden;
  transition: 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.userbox:hover {
  cursor: pointer;
}
.userbox:active {
  border-bottom: 0;
}
.userbox:first-child {
  margin-top: 0;
}
.username {
  font-family: sans-serif;
  margin: 0;
}
.online {
  border: 0.2rem solid #268bd2;
  background: #268bd2;
}
.offline {
  border: 0.2rem solid #aaa;
  background: #aaa;
}
.image_container {
  position: relative;
  padding-right: 1rem;
}
.icon {
  vertical-align: middle;
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
  margin-left: 0.1rem;
}
.badge {
  position: fixed;
  height: 0.9rem;
  width: 0.9rem;
  border-radius: 50%;
  background: #268bd2;
  right: 1rem;
}
@media screen and (min-width: 700px) {
  .selected {
    margin-right: 0;
    border-radius: 2rem 0 0 2rem;
  }
}
</style>