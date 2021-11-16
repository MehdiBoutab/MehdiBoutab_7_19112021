<template>
  <div>
    <form method="post" @submit.prevent="buttonNewComment" class="form1">
      <div class="newcomment">
        <label for="comment"></label>
        <input
          type="text"
          id="comment"
          placeholder="Commentaire ...."
          v-model="comment"
        />
      </div>
      <button class="submit" type="submit" @click.prevent="buttonNewComment">
        Envoyer
      </button>
    </form>
    <div class="error" v-if="error">
      {{ error.error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newComment",
  props: {
    id: Number,
  },

  data() {
    return {
      comment: "",
      error: "",
    };
  },

  methods: {
    buttonNewComment() {
      const data = {
        comment: this.comment,
      };
      let token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/api/messages/" + this.id + "/comment/",
          data,
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res) => {
          console.log(res);
          this.$router.push("/commentCard/" + this.id);
          document.location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>
