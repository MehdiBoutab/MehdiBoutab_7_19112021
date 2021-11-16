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

    <div class="commentaire">
      <newComment :id="id" />
      <div id="comment-card" v-for="comment in allComments" :key="comment.id">
        <div class="content">
          <i class="user-name">
            {{ comment.User.name }} {{ comment.User.firstname }}
          </i>
          <i class="date">
            {{ moment(comment.createdAt).fromNow() }}
          </i>

          <div v-if="comment.idUsers == userId || isAdmin == true">
            <deleteComment :idComm="comment.id" />
          </div>
        </div>
        <p class="F-comment">{{ comment.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
let moment = require("moment");
import "moment/locale/fr";
import newComment from "./newComment";
import deleteComment from "./deleteComment";
let jwt = require("jsonwebtoken");

import axios from "axios";

export default {
  name: "oneMessage",
  components: {
    deleteComment,
    newComment,
  },
  data() {
    return {
      moment: moment,
      token: "",
      isAdmin: "",
      id: this.$route.params.id,
      userId: localStorage.getItem("id"),
      allComments: [],
    };
  },
  methods: {
    loadComments() {
      let token = localStorage.getItem("token");
      let decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      axios
        .get("http://localhost:3000/api/messages/" + this.id + "/comments/", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.isAdmin = decodedToken.isAdmin;
          this.allComments = res.data;
          // console.log(this.allComments);
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadComments();
  },
};
</script>
