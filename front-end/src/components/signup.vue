<template>
  <div class="signup">
    <div class="form">
      <h2>Inscription</h2>
      <form method="post" @submit.prevent="buttonSignup">
        <div class="flex">
          <label class="color" for="mail">E-mail :</label>
          <input
            type="Email"
            id="mail"
            name="user_mail"
            placeholder="email@groupomania.com"
            v-model="email"
          />
        </div>

        <div class="flex">
          <label class="color" for="name">Nom :</label>
          <input
            type="text"
            id="name"
            placeholder="Nom"
            name="user_name"
            v-model="name"
          />
        </div>

        <div class="flex">
          <label class="color" for="firsname">Prénom : </label>
          <input
            type="text"
            id="prénom"
            placeholder="Prénom"
            v-model="firstname"
          />
        </div>

        <div class="flex">
          <label class="color" for="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Votre mot de passe"
            v-model="password"
          />
        </div>

        <button type="submit" @click.prevent="buttonSignup">S'inscrire</button>
      </form>
      <div class="error" v-if="error">
        {{ error.error }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signup",

  data() {
    return {
      email: "",
      name: "",
      firstname: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async buttonSignup() {
      const data = {
        email: this.email,
        name: this.name,
        firstname: this.firstname,
        password: this.password,
      };

      await axios
        .post("http://localhost:3000/api/auth/signup", data)
        .then((res) => {
          console.log(res);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
  },
};
</script>
