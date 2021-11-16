<template>
  <div>
    <nav id="nav">
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        alt="logo"
        class="Groupomania"
      />
      <ul id="links">
        <router-link to="/mainPage">
          <li class="link">Accueil</li>
        </router-link>
      </ul>
    </nav>

    <div class="info">
      <h2>Vos informations</h2>
    </div>
    <div class="profil">
      <div class="modify">
        <p><i>E-mail :</i> {{ dataProfile.email }}</p>
        <p><i>Nom :</i> {{ dataProfile.name }}</p>
        <p><i>Prénom :</i> {{ dataProfile.firstname }}</p>
      </div>

      <form method="post" @submit.prevent="updateProfile" class="form-group">
        <div class="formulaire">
          <div>
            <label for="name"></label>
            <input type="name" id="name" placeholder="Nom" v-model="name" />
          </div>
          <div>
            <label for="firstname"></label>
            <input
              type="firstname"
              id="firstname"
              placeholder="Prénom"
              v-model="firstname"
            />
          </div>
        </div>

        <div class="btn">
          <button
            class="modifybtn"
            type="submit"
            @click.prevent="updateProfile"
          >
            Modifier
          </button>
          <button
            class="deletebtn"
            type="submit"
            @click.prevent="deleteProfile"
          >
            Supprimer mon compte
          </button>
        </div>
      </form>
    </div>

    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "profil",

  data() {
    return {
      token: "",
      error: "",
      userId: "",
      dataProfile: [],
      email: "",
      name: "",
      firstname: "",
    };
  },

  methods: {
    loadProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .get("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.dataProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },

    updateProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      const data = {
        name: this.name,
      };
      axios
        .put("http://localhost:3000/api/auth/profile/" + userId, data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre profil a bien été mis à jour !");
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },

    deleteProfile() {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("id");
      axios
        .delete("http://localhost:3000/api/auth/profile/" + userId, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre compte est supprimé !");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadProfile();
  },
};
</script>
