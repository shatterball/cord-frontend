<template>
  <div @click="loadChat" class="userbox shared shadow">
    <img :class="[user.sex == 1 ? 'male' : 'female']" class="icon shadow" />
    <p class="username shared">
      {{ trimName }}
      <span class="condensed">{{ trimUsername }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "chatItem",
  data: function() {
    return {
      fullname: this.user.fname + " " + this.user.lname
    };
  },
  props: {
    user: {}
  },
  methods: {
    loadChat: function() {
      this.$emit("load-chat", this.user.id);
    }
  },
  computed: {
    trimUsername() {
      var username = this.user.username;
      if (username.length > 15) {
        username = username.substring(0, 12) + "...";
      }
      return "(@" + username + ")";
    },
    trimName() {
      var fullname = this.user.fname + " " + this.user.lname;
      if (fullname.length > 24) {
        fullname = fullname.substring(0, 24) + "...";
      }
      return fullname;
    }
  }
};
</script>

<style scoped>
.shared {
  font-family: Roboto;
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
}
.userbox {
  display: flex;
  align-items: center;
  margin: 1rem;
  border: 1px solid #ddd;
  border-bottom: 0;
  border-radius: 2rem;
  background: #eee;
  height: 4rem;
  overflow: hidden;
}
.userbox:hover {
  background: #ddd;
  border: 1px solid #eee;
  border-bottom: 0;
  cursor: pointer;
}
.username {
  font-size: 0.9rem;
  padding-left: 1rem;
}
.online {
  border: 0.2rem solid #2aa198;
  background: #2aa198;
}
.icon {
  border-radius: 2.5rem;
  border: 0.2rem solid #aaa;
  background: #aaa;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.5rem;
}
</style>