<template>
  <div class="mainPage">
    <div id="message-card" v-for="message in allMessages" :key="message.id">
      <div class="createdAt">
        <i>{{ message.User.name }} {{ message.User.firstname }}</i>
        <br />
        <i>{{ moment(message.createdAt).fromNow() }}</i>
      </div>

      <div class="title">
        <h2 class="title">{{ message.title }}</h2>
        <div
          class="adminDelete"
          v-if="message.idUsers == userId || isAdmin == true"
        >
          <deletePost :id="message.id" />
        </div>
      </div>

      <div class="content">
        <p class="message">{{ message.content }}</p>

        <div class="image">
          <img
            :src="message.image"
            :alt="message.image"
            v-if="message.image != null"
          />
        </div>
      </div>

      <div class="footer">
        <div>
          <router-link class="one-message" :to="'/commentCard/' + message.id"
            >Voir les commentaires</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deletePost from "./deletePost";
let moment = require("moment");
import "moment/locale/fr";
let jwt = require("jsonwebtoken");
import axios from "axios";

export default {
  name: "loadMessages",
  components: {
    deletePost,
  },
  data() {
    return {
      moment: moment,
      token: "",
      userId: localStorage.getItem("id"),
      isAdmin: "",
      allMessages: [],
      idUsers: "",
      title: "",
      content: "",
      createAt: "",
    };
  },
  methods: {
    loadFeed() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      axios
        .get("http://localhost:3000/api/messages/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.allMessages = res.data;
          this.isAdmin = decodedToken.isAdmin;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadFeed();
  },
};
</script>
