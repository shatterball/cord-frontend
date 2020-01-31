<template>
  <div class="register_pane">
    <div class="container">
      <h1 class="banner">Register</h1>
      <label>Name:</label>
      <input v-model="fname" class="inp" type="text" placeholder="Firstname" />
      <input v-model="lname" class="inp" type="text" placeholder="Lastname" />
      <label>Email:</label>
      <input v-model="email" class="inp2" type="email" placeholder="someone@mail.com" />
      <label>Username:</label>
      <input v-model="username" class="inp2" type="text" placeholder="username" />
      <label>Password:</label>
      <input v-$model="passwd" class="inp2" type="password" placeholder="Enter password" />
      <input v-$model="passwd_re" class="inp2" type="password" placeholder="Enter password again" />
      <div class="error" v-if="noMatch">Passwords do not match</div>
      <div class="sex">
        <label>Sex:</label>
        <div class="radio">
          <div>
            <input v-model="sex" type="radio" value="1" />
            <label>Male</label>
          </div>
          <div>
            <input v-model="sex" type="radio" value="0" />
            <label>Female</label>
          </div>
        </div>
      </div>
      <div v-if="errorMode" class="error shadow">{{error}}</div>
      <button class="button shadow" @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data: function() {
    return {
      fname: "",
      lname: "",
      email: "",
      username: "",
      passwd: "",
      passwd_re: "",
      sex: "",
      errorMode: false,
      error: ""
    };
  },
  methods: {
    register() {
      if (
        this.sex == "" ||
        this.fname == "" ||
        this.lname == "" ||
        this.email == "" ||
        this.username == "" ||
        this.passwd_re == "" ||
        this.passwd == ""
      ) {
        this.errorMode = true;
        this.error = "Please fill out all the spaces!";
      } else if (this.passwd == this.passwd_re) {
        Axios.post("https://api-cord.herokuapp.com/api/register", {
          fname: this.fname,
          lname: this.lname,
          username: this.username,
          email: this.email,
          passwd: this.passwd,
          sex: parseInt(this.sex)
        })
          .catch(err => {
            this.error = err.response.data.error;
            this.errorMode = true;
            this.passwd = "";
            this.passwd_re = "";
            this.username = "";
          })
          .then(() => {
            if (!this.errorMode) this.$router.push({ name: "login" });
          });
      }
    }
  },
  computed: {
    noMatch() {
      return this.passwd != this.passwd_re;
    }
  }
};
</script>

<style scoped>
body {
  font-family: sans-serif;
}
.banner {
  color: #444;
  font-size: 2.5rem;
  font-weight: 500;
  padding: 0;
  margin-top: 0;
}
.error {
  color: #eee;
  background: #dc322f;
  border-radius: 2rem;
  font-size: 0.8rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inp {
  padding: 0 1rem;
  height: 2rem;
  border-radius: 2rem;
  outline: none;
  border: none;
  margin: 0.5rem 0;
}
.inp2 {
  margin: 0.5rem 0;
  height: 2rem;
  border-radius: 2rem;
  outline: none;
  border: none;
  padding: 0 1rem;
}
.sex {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.radio {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.register_pane {
  display: flex;
  justify-content: center;
  height: 100vh;
  background: #ddd;
  align-items: center;
}
.inputs_name {
  display: flex;
  justify-content: space-between;
}
.container {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.container label {
  margin: 0 0.5rem;
}
.button {
  cursor: pointer;
  user-select: none;
  margin-top: 0.5rem;
  color: #eee;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  height: 2rem;
  transition: 0.2s;
  background: #268bd2;
  -webkit-tap-highlight-color: transparent;
}
.button:active {
  transform: scale(0.9);
}
@media screen and (max-width: 700px) {
  .container {
    width: 90%;
  }
  .radio {
    width: 60%;
  }
  .inp {
    width: 90%;
    height: 2.5rem;
  }
  .inp2 {
    height: 2.5rem;
  }
  .button {
    height: 2.5rem;
  }
}
</style>