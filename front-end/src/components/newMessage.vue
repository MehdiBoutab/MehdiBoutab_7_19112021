<template>
  <div class="main">
    <form method="post" @submit.prevent="btnNewMessage" class="form1">
      <div class="title">
        <label for="title"></label>
        <input
          class="label-title"
          type="title"
          id="title"
          placeholder="Titre"
          v-model="title"
        />
      </div>
      <div>
        <label for="content"></label>
        <textarea
          type="text"
          id="content"
          placeholder="Quoi de neuf ?" 
          rows="5"
          cols="33"
          v-model="content"
        />
      </div>
      <div class="btn">
        <div class="file">
          <label for="File"> </label><br />
          <input class="file" type="file" ref="file" @change="selectFile()" />
        </div>

        <button class="send" type="submit" @click.prevent="btnNewMessage">
          Envoyer
        </button>
      </div>

      <div class="error" v-if="error">
        {{ error.error }}
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newpost",

  data() {
    return {
      title: "",
      content: "",
      file: null,
      error: "",
    };
  },

  methods: {
    btnNewMessage() {
      let token = localStorage.getItem("token");
      const data = new FormData();
      if (this.file == null) {
        data.append("title", this.title);
        data.append("content", this.content);
      } else {
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("image", this.file, this.file.name);
      }

      axios
        .post("http://localhost:3000/api/messages/", data, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          alert("Votre message a bien été envoyé !");
          document.location.reload();
          this.$router.push("/mainPage");
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },

    selectFile() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>

<style></style>
