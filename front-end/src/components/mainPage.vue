<template>
  <div>
    <nav id="nav">
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        alt="logo"
        class="Groupomania"
      />
      <ul class="links">
        <li>
          <router-link class="link" to="/profil"> Mon compte</router-link>
        </li>
        <li>
          <a class="link" to="/login" v-on:click="Logout()"> Déconnexion</a>
        </li>
      </ul>
    </nav>

    <div class="container">
      <div class="hero">
        <newMessage />
      </div>
      <div>
        <messageCard />
      </div>
    </div>
  </div>
</template>

<script>
import messageCard from "./messageCard.vue";
import newMessage from "./newMessage";

export default {
  name: "mainPage",
  components: {
    messageCard,
    newMessage,
  },
  data() {
    return {
      token: "",
      allMessages: [],
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
