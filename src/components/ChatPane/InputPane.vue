<template>
  <div class="input_pane">
    <div>
      <div class="emoji_picker" :class="[showEmojiPicker == true ? 'show' : 'hide']">
        <VEmoji @select="appendEmoji" class="shadow" />
      </div>
      <img
        class="button shared"
        @click="showEmojiPicker = !showEmojiPicker"
        src="../../assets/emoji.svg"
        id="emojiButton"
      />
    </div>
    <input
      v-model="text"
      placeholder="Write something..."
      class="input_bar shared"
      @keyup.enter="sendMessage"
      @keydown="onKeyDownNotEnter"
      ref="inputBar"
      autofocus
    />
    <img
      @click="sendMessage"
      :class="{ 'enable': this.text.length > 0}"
      class="button shared"
      id="sendButton"
      src="../../assets/send.svg"
    />
  </div>
</template>
<script>
import VEmoji from "v-emoji-picker";

export default {
  name: "inputPane",
  data: function() {
    return {
      text: "",
      showEmojiPicker: false,
      timeout: undefined
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
        this.$refs.inputBar.focus();
        this.showEmojiPicker = false;
        if (this.selectedUser.id != undefined) {
          message.content = this.text.trim();
          this.$emit("send-message", message);
        }
      }
      this.text = "";
    },
    appendEmoji: function(emoji) {
      this.text = this.text + emoji.data;
    },
    timeoutFunction: function() {
      this.typing = false;
      this.$emit("typing", false);
    },
    onKeyDownNotEnter: function(event) {
      if (this.typing == false && event.key != "Enter") {
        this.typing = true;
        this.$emit("typing", true);
        this.timeout = setTimeout(this.timeoutFunction, 1000);
      } else {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.timeoutFunction, 1000);
      }
    }
  }
};
</script>

<style scoped>
.show {
  visibility: visible;
}
.hide {
  visibility: hidden;
}
.icon {
  height: 2rem;
  width: 2rem;
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
  justify-content: space-between;
  align-items: center;
}
.input_bar {
  font-family: sans-serif;
  flex: 1 0 auto;
  color: #555;
  background: #eee;
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
  border-radius: 0;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  margin: 0 1rem;
  color: #888;
  transition: 0.2s;
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
    margin: 0 1rem;
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