<template>
  <div class="input_pane">
    <div>
      <div class="emoji_picker" :class="[showEmojiPicker == true ? 'show' : 'hide']">
        <VEmoji @select="appendEmoji" class="shadow" />
      </div>
      <button class="button" @click="showEmojiPicker = !showEmojiPicker" id="emojiButton">
        <font-awesome icon="laugh" />
      </button>
    </div>
    <input
      v-model="text"
      placeholder="Write something..."
      class="input_bar shared"
      @keyup.enter="sendMessage"
    />
    <button
      @click="sendMessage"
      :class="{ 'enable': this.text.length > 0}"
      class="button shared"
      id="sendButton"
    >
      <font-awesome icon="paper-plane" />
    </button>
  </div>
</template>
<script>
import VEmoji from "v-emoji-picker";
export default {
  name: "inputPane",
  data: function() {
    return {
      text: "",
      showEmojiPicker: false
    };
  },
  components: {
    VEmoji
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
        from: this.currentUser.id,
        to: this.selectedUser.id,
        date: Date.now(),
        content: ""
      };
      if (this.text !== "") {
        if (this.selectedUser.id != undefined) {
          message.content = this.text.trim();
          this.$emit("send-message", message);
        }
      }
      this.text = "";
    },
    appendEmoji: function(emoji) {
      this.text = this.text + emoji.data;
    }
  }
};
</script>

<style scoped>
.show {
  display: block;
}
.hide {
  display: none;
}
.shared {
  border: none;
  border-radius: 2rem;
  outline: none;
  font-family: Roboto;
  background: #ccc;
}
.enable {
  color: #888;
}
.emoji_picker {
  position: absolute;
  margin-top: -30rem;
  margin-left: 2rem;
}
.input_pane {
  display: flex;
  height: 4rem;
  padding: 0 1rem;
  justify-content: space-evenly;
  align-items: center;
}
.input_bar {
  font-family: sans-serif
  flex: 1 0 auto;
  color: #555;
  background: #eee;
  border: none;
  margin: 0 1rem;
  padding: 0 1rem;
  color: #222;
  height: 2.5rem;
  font-size: 0.85rem;
}
::placeholder {
  color: #888;
}
.button {
  background: #ddd;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0 0.5rem;
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
    margin: 0 0.5rem;
  }
  .input_bar:focus {
    margin: 0 0.5rem;
  }
  .button {
    margin: 0 0.5rem;
  }
  .emoji_picker {
    margin-left: 1rem;
  }
  #emojiButton {
    margin-left: 1rem;
    margin-right: 0rem;
  }
  #sendButton {
    margin-right: 1rem;
    margin-left: 0rem;
  }
}
</style>