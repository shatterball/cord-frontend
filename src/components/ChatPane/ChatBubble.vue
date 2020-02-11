<template>
  <div :class="[type ? 'send' : 'recv']" class="bubble shared">
    <p class="shared message">{{ msg.content }}</p>
    <p class="time shared">{{date}}</p>
  </div>
</template>

<script>
export default {
  name: "chatBubble",
  props: {
    msg: {},
    type: Boolean
  },
  computed: {
    date() {
      return new Date(this.msg.date).toLocaleTimeString("en-IN", {
        timeStyle: "short"
      });
    }
  }
};
</script>

<style scoped>
.shared {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
.bubble {
  margin: 0.3rem 0;
  position: relative;
  font-size: 0.8rem;
  max-width: 30rem;
  border-radius: 0.3rem;
}
.message {
  color: #000;
  padding: 0.5rem 0.6rem;
  padding-bottom: 0;
  word-break: break-word;
}
.time {
  color: #444;
  font-size: 0.6rem;
  padding: 0.5rem 0.6rem;
  padding-top: 0;
}
.send {
  align-self: flex-end;
  color: #333;
  background: #97caef;
  padding: 0;
  border-top-right-radius: 0;
  margin-right: 5rem;
}
.send:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left-color: #97caef;
  border-right: 0;
  border-top: 0;
  margin-right: -10px;
}
.send .time {
  text-align: right;
}
.recv {
  align-self: flex-start;
  color: #222;
  background: #ccc;
  margin-left: 5rem;
  border-top-left-radius: 0;
}
.recv:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right-color: #97efe8;
  border-left: 0;
  border-top: 0;
  margin-top: 0px;
  margin-left: -10px;
}
.recv .time {
  text-align: left;
}
@media screen and (max-width: 700px) {
  .bubble {
    max-width: 80%;
  }
  .send {
    margin-right: 1rem;
  }
  .recv {
    margin-left: 1rem;
  }
}
</style>