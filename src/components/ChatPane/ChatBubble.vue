<template>
  <transition name="fade" mode="out-in">
    <div :class="[type ? 'send' : 'recv']" class="bubble shared">
      <p class="message shared">{{ msg.content }}</p>
      <p class="time shared">{{date}}</p>
    </div>
  </transition>
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
      return (
        new Date(this.msg.date)
          .toLocaleTimeString("en-IN", {
            timeStyle: "short"
          })
          .substring(0, 5) + "PM"
      );
    }
  }
};
</script>

<style scoped>
.shared {
  font-family: sans-serif;
  color: #93a1a1;
  margin: 0;
  padding: 0;
}
.bubble {
  margin: 0.3rem 0;
  font-size: 0.85rem;
  max-width: 30rem;
  margin-left: auto;
  border-radius: 1rem;
}
.send {
  align-self: flex-end;
  color: #333;
  /* background: #0087ff; */
  border: 0.1rem solid #0087ff;
  border-radius: 1rem 1rem 0.2rem 1rem;
  padding: 0;
  text-align: right;
}
.recv {
  align-self: flex-start;
  /* background: #2aa198; */
  border: 0.1rem solid #d33682;
  border-radius: 1rem 1rem 1rem 0.2rem;
  margin-left: 0;
  text-align: left;
}
.message {
  color: #333;
  padding: 0.5rem 0.6rem;
  padding-bottom: 0;
  word-break: break-word;
}
.time {
  font-size: 0.7rem;
  padding: 0.5rem 0.6rem;
  padding-top: 0;
}
@media screen and (max-width: 700px) {
  .container {
    padding: 0;
  }
}
</style>