<template>
  <div class="register_pane">
    <div class="container">
      <h1 class="banner">Register</h1>
      <label>Name:</label>
      <input v-model="fname" class="input" type="text" placeholder="Firstname" />
      <input v-model="lname" class="input" type="text" placeholder="Lastname" />
      <label>Email:</label>
      <input v-model="email" class="input" type="email" placeholder="someone@mail.com" />
      <label>Username:</label>
      <input v-model="username" class="input" type="text" placeholder="Username" />
      <label>Password:</label>
      <input v-$model="passwd" class="input" type="password" placeholder="Enter password" />
      <input v-$model="passwd_re" class="input" type="password" placeholder="Enter password again" />
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
      <div v-if="errorMode" class="error">{{error}}</div>
      <button class="button" @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
var apiUri = "https://apicord.herokuapp.com";
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
      error: "",
      showLoader: false
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
        this.error = "Please fill out all the required fields!";
      } else if (this.passwd == this.passwd_re) {
        Axios.post(apiUri + "/api/register", {
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
            if (!this.errorMode) {
              setTimeout(500);
              this.$router.push({ name: "login" });
            }
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
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
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
.input {
  transition: 0.2s;
  margin: 0.5rem 0;
  height: 2rem;
  border-radius: 2rem;
  outline: none;
  border: 2px solid #ccc;
  padding: 0 1rem;
}
.input:focus {
  border: 2px solid #268bd2;
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
  background: #efefef;
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
  align-self: center;
  cursor: pointer;
  user-select: none;
  margin-top: 0.5rem;
  color: #eee;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  height: 2rem;
  width: 40%;
  transition: 0.2s;
  background: #268bd2;
  -webkit-tap-highlight-color: transparent;
}
.button:active {
  transform: scale(0.9);
}
.overlay {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: #eee;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  border: 0.3rem solid #f3f3f3;
  border-top: 0.3rem solid #268bd2;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
label {
  font-weight: 500;
}
@media screen and (max-width: 700px) {
  .register_pane {
    align-items: flex-start;
    overflow: auto;
  }
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
  .input {
    height: 2.5rem;
  }
  .button {
    height: 2.5rem;
  }
}
</style>