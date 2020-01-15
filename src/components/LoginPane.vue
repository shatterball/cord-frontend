<template>
  <div class="login_pane">
    <div class="container">
      <p class="label">Username</p>
      <input type="text" />
      <p class="label">Password</p>
      <input type="password" />
      <button class="button">Login</button>
    </div>
  </div>
</template>

<style scoped>
.label {
  padding: 0;
  margin: 0;
  text-decoration: underline;
}
.container {
  width: 30%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.button {
  width: 50%;
}
.login_pane {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>