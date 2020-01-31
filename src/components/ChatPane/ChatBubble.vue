<template>
  <div :class="[type ? 'send' : 'recv']" class="bubble shared">
    <p class="message shared">{{ msg.content }}</p>
  </div>
</template>

<script>
export default {
  name: "chatBubble",
  props: {
    msg: {},
    type: Boolean
  }
};
</script>

<style scoped>
.shared {
  font-family: Arial;
  color: #93a1a1;
  margin: 0;
  padding: 0;
}
.bubble {
  margin: 0.3rem 0;
  font-size: 0.85rem;
  max-width: 30rem;
  margin-left: auto;
  border-radius: 1.5rem;
}
.send {
  align-self: flex-end;
  background: #0087ff;
  padding: 0;
}
.recv {
  align-self: flex-start;
  background: #2aa198;
  margin-left: 0;
}
.message {
  color: #fff;
  padding: 0.5rem 0.8rem;
  word-break: break-all;
}
@media screen and (max-width: 700px) {
  .container {
    padding: 0;
  }
}
</style>