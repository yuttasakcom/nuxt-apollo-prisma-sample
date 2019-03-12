<template>
  <div>
    <h1>Nuxt Apollo Sample</h1>
    <p>Create User</p>
    <form @submit.prevent="onSubmit">
      <label for="name">Name&nbsp;</label>
      <input type="text" v-model="name">
      <button>submit</button>
    </form>
    <hr>
    <p>User list</p>
    <ul v-if="users && users.length > 0">
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
        <button @click="onDelete(user.id)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    name: ""
  }),
  computed: {
    ...mapState("users", ["users"])
  },
  methods: {
    ...mapActions("users", ["setUser", "deleteUser"]),
    onDelete(userId) {
      this.deleteUser(userId);
    },
    onSubmit() {
      if (this.name === "") return;
      this.setUser({ name: this.name });
      this.name = "";
    }
  }
};
</script>

<style>
hr {
  margin: 2rem 0;
}
</style>