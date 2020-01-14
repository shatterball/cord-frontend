<template>
  <div :class="[type == true ? 'send' : 'recv']" class="bubble reset">
    <p class="message shared">{{ msg.content }}</p>
  </div>
</template>

<script>
export default {
  name: "chatBubble",
  props: {
    msg: {},
    type: Number
  }
};
</script>

<style scoped>
.shared {
  font-family: Roboto;
  color: #93a1a1;
  margin: 0;
  padding: 0;
}
.bubble {
  margin: 0.3rem 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
  font-size: 0.85rem;
  max-width: 30rem;
  margin-left: auto;
}
.send {
  align-self: flex-end;
  background: #0087ff;
  padding: 0;
  border-radius: 1rem 0 1rem 1rem;
}
.recv {
  align-self: flex-start;
  background: #d33682;
  margin-left: 0;
  border-radius: 0 1rem 1rem 1rem;
}
.message {
  color: #fdf6e3;
  padding: 0.5rem 1rem;
  /* word-wrap: break-word; */
  word-break: break-all;
}
@media screen and (max-width: 700px) {
  .container {
    padding: 0;
  }
}
</style>