<template>
  <div class="input_pane">
    <div>
      <div class="emoji_picker" :class="[showEmojiPicker == true ? 'show' : 'hide']">
        <VEmoji @select="appendEmoji" class="shadow" />
      </div>
      <button class="button shared" @click="showEmojiPicker = !showEmojiPicker" id="emojiButton">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8M8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8M12,17.5C9.67,17.5 7.69,16.04 6.89,14H17.11C16.3,16.04 14.33,17.5 12,17.5Z"
          />
        </svg>
      </button>
    </div>
    <input
      v-model="text"
      placeholder="Write something..."
      class="input_bar shared"
      @keyup.enter="sendMessage"
      @keyup="typingEvent"
      ref="inputBar"
    />
    <button
      @click="sendMessage"
      :class="{ 'enable': this.text.length > 0}"
      class="button shared"
      id="sendButton"
    >
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.78,17.91C22.94,18.16 23,18.42 23,18.7C23,19.08 22.87,19.39 22.57,19.64C22.27,19.89 21.94,20 21.56,20H19.08L12.42,8H11.58L4.92,20H2.39C1.92,20 1.53,19.8 1.22,19.38C0.91,18.96 0.89,18.5 1.17,18L10.78,1.69C11.09,1.22 11.5,1 12,1C12.53,1 12.92,1.22 13.17,1.69L22.78,17.91M4.78,22.31L12,9.38L19.22,22.31L18.5,23L12,20.34L5.44,23L4.78,22.31Z"
        />
      </svg>
    </button>
  </div>
</template>
<script>
import VEmoji from "v-emoji-picker";
import uuid from "uuid";

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
      if (this.text !== "") {
        var message = {
          _id: uuid.v1(),
          from: this.currentUser.id,
          to: this.selectedUser.id,
          date: Date.now(),
          content: this.text.trim(),
          status: 0
        };
        this.$refs.inputBar.focus();
        this.showEmojiPicker = false;
        if (this.selectedUser.id != undefined) {
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
    typingEvent: function(event) {
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
  opacity: 1;
  visibility: visible;
}
.hide {
  opacity: 0;
  visibility: hidden;
}
.icon {
  height: 2rem;
  width: 2rem;
}
.shared {
  border: none;
  outline: none;
  font-family: sans-serif;
  background: #ccc;
}
.enable {
  color: #888;
}
.emoji_picker {
  position: absolute;
  margin-top: -28rem;
  margin-left: 0.5rem;
  transition: 0.2s;
}
.input_pane {
  display: flex;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
}
.input_bar {
  font-family: sans-serif;
  flex: 1 0 auto;
  color: #555;
  background: #eee;
  border-radius: 2rem;
  margin: 0;
  padding: 0 1rem;
  color: #222;
  height: 2.5rem;
  font-size: 0.85rem;
}
::placeholder {
  color: #888;
}
.button {
  padding: 0;
  background: #ddd;
  border-radius: 0;
  height: 1.8rem;
  width: 1.8rem;
  cursor: pointer;
  margin: 0 1.5rem;
  color: #666;
  transition: 0.2s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.button:hover {
  color: #444;
}
#sendButton {
  transform: rotateZ(90deg);
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