<template>
  <div class="login">
    <nav id="nav">
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        alt="logo "
        class="Groupomania"
      />
    </nav>
    <div class="form2">
      <div class="formulaire">
        <h2 class="cnx">Connexion</h2>
        <form method="post" @submit.prevent="buttonLogin">
          <div>
            <label class="password" for="email">Email</label>
            <input
              type="email"
              placeholder="email@groupomania.com"
              v-model="email"
            />
          </div>
          <div class="password">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              v-model="password"
            />
          </div>

          <p class="login">
            Vous n’avez pas de compte ?
            <router-link to="/" class="login"> Inscrivez-vous</router-link>
          </p>

          <button type="submit">Se connecter</button>
        </form>
        <div class="error" v-if="error">
          {{ error.error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",

  data() {
    return {
      token: "",
      email: "",
      password: "",
      userId: "",
      error: "",
    };
  },

  methods: {
    async buttonLogin() {
      await axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.userId);
          }
          this.$router.push("/mainPage");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>

<style lang="css"></style>
