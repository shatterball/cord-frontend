<template>
  <div
    :class="{
      send: type,
      recv: !type,
      _send: type && !shape,
      _recv: !type && !shape,
      space: space == true,
    }"
    class="bubble shared"
  >
    <p class="shared message">{{ msg.content }}</p>
    <div class="info">
      <p class="time shared">{{ date }}</p>
      <div
        class="status shared"
        :class="{
          unread: msg.status == 0,
          sent: msg.status == 1,
          read: msg.status == 2,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'chatBubble',
  props: {
    msg: {},
    shape: Boolean,
    space: Boolean,
    type: Boolean,
  },
  computed: {
    date() {
      return moment(this.msg.date).format('lll');
    },
  },
};
</script>

<style scoped>
.shared {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
.bubble {
  margin: 1px 0;
  position: relative;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.2rem;
}
.space {
  margin-bottom: 0.5rem;
}
.message {
  color: #000;
  padding: 0.5rem 0.6rem;
  padding-bottom: 0;
  max-width: 35rem;
  word-break: break-word;
}
.info {
  max-width: 5rem;
  align-self: flex-end;
  margin-right: 0.45rem;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.3rem;
  align-items: center;
}
.time {
  color: #444;
  font-size: 0.6rem;
  align-self: flex-end;
  margin-right: 0.3rem;
  margin-left: 0.5rem;
}
.status {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
}
.unread {
  background: #0080ff;
}
.sent {
  background: #ccc;
}
.read {
  background: #00eeff;
}
.send {
  align-self: flex-end;
  color: #fff;
  background: #0080ff;
  padding: 0;
  margin-right: 5rem;
}
.send .message {
  color: #eee;
}
.send .time {
  color: #ddd;
}
._send {
  border-top-right-radius: 0;
}
._send:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left-color: #0080ff;
  border-right: 0;
  border-top: 0;
  margin-right: -10px;
}
.recv {
  align-self: flex-start;
  color: #222;
  background: #ddd;
  margin-left: 5rem;
}
.recv .info {
  margin-left: 0.6rem;
  align-self: flex-start;
}
.recv .time {
  margin-left: 0;
}
._recv {
  border-top-left-radius: 0;
}
._recv:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right-color: #ddd;
  border-left: 0;
  border-top: 0;
  margin-top: 0px;
  margin-left: -10px;
}
.recv .status {
  display: none;
}
@media screen and (max-width: 700px) {
  .bubble {
    max-width: 80%;
  }
  .send {
    margin-right: 1.2rem;
  }
  .recv {
    margin-left: 1.2rem;
  }
  .time {
    margin-bottom: 0.1rem;
  }
  .status {
    margin-right: 0.2rem;
  }
  .info {
    margin-right: 0.25rem;
  }
  .status {
    margin-bottom: 0.1rem;
  }
}
</style>
