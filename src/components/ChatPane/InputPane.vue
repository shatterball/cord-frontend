<template>
  <div class="input_pane">
    <div>
      <div class="emoji_picker" :class="[showEmojiPicker == true ? 'show' : 'hide']">
        <VEmoji @select="appendEmoji" class="shadow" />
      </div>
      <button class="button shared" @click="showEmojiPicker = !showEmojiPicker" id="emojiButton">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
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
    typingEvent: function() {
      if (this.typing == false) {
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
  background: #e0e0e0;
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
  color: #333;
  background: #fff;
  border-radius: 2rem;
  margin: 0;
  padding: 0 1rem;
  height: 2.5rem;
  font-size: 0.9rem;
}
::placeholder {
  color: #888;
}
.button {
  padding: 0;
  background: #ddd;
  border-radius: 0;
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  margin: 0 1.5rem;
  color: #666;
  transition: 0.2s;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
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
    display: none;
  }
  #sendButton {
    margin-right: 1rem;
    margin-left: 0rem;
    height: 2rem;
    width: 2rem;
  }
}
</style>