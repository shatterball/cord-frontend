<template>
  <div class="input_pane">
    <input
      v-model="text"
      placeholder="Write something..."
      class="input_bar shared shadow"
      @keyup.enter="sendMessage"
    />
    <button @click="sendMessage" :class="{ 'enable': this.text.length > 0}" class="button shared">
      <font-awesome icon="paper-plane" />
    </button>
  </div>
</template>
<script>
export default {
  name: "inputPane",
  data: function() {
    return {
      text: ""
    };
  },
  props: {
    selectedUser: {},
    currentUser: {}
  },
  watch: {
    selectedUser: function() {
      this.text = "";
    }
  },
  methods: {
    sendMessage: function() {
      var message = {
        users: this.currentUser.id + "-" + this.selectedUser.id,
        msg_id: Number,
        sender_id: this.currentUser.id,
        dest_id: this.selectedUser.id,
        content: ""
      };
      if (this.text !== "") {
        if (this.selectedUser.id != undefined) {
          message.content = this.text.trim();
          this.$emit("send-message", message);
        }
      }
      this.text = "";
    }
  }
};
</script>

<style scoped>
.shared {
  border: none;
  border-radius: 2rem;
  outline: none;
  font-family: Roboto;
  background: #ccc;
}
.shadow {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
}
.enable {
  color: #888;
}
.input_pane {
  display: flex;
  height: 4rem;
  padding: 0 3rem;
  justify-content: space-between;
  align-items: center;
}
.input_bar {
  flex: 1 0 auto;
  color: #555;
  background: #eee;
  border: none;
  margin: 0 2rem;
  padding: 0 1rem;
  transition: 0.2s;
  color: #222;
  height: 2.5rem;
  font-size: 0.85rem;
}
.input_bar:focus {
  margin: 0;
  transition: 0.2s;
}
::placeholder {
  color: #888;
}
.button {
  background: #ddd;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 1rem;
  height: 2.5rem;
  color: #888;
  transition: 0.2s;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
}
.button:active {
  transform: scale(0.85);
}
@media screen and (max-width: 700px) {
  .input_pane {
    padding: 0;
  }
  .input_bar {
    margin-left: 1rem;
    margin-right: 0rem;
  }
  .input_bar:focus {
    margin-left: 1rem;
  }
  .button {
    margin-right: 1rem;
    margin-left: 0.5;
  }
}
</style>