import createUser from '../graphql/user/mutation/createUser.gql'
import deleteUser from '../graphql/user/mutation/deleteUser.gql'

export const state = () => ({
  users: [],
})

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_USER(state, user) {
    state.users.unshift(user)
  },
  DELETE_USER(state, userId) {
    const id = state.users.findIndex(user => user.id === userId)
    state.users.splice(id, 1)
  },
}

export const actions = {
  setUsers({ commit }, users) {
    commit('SET_USERS', users)
  },
  async setUser({ commit }, { name }) {
    const client = this.app.apolloProvider.defaultClient
    const dateTime = new Date().toISOString()
    const { data } = await client.mutate({
      mutation: createUser,
      variables: {
        data: { name, updatedAt: dateTime, createdAt: dateTime },
      },
    })
    commit('SET_USER', data.createUser)
  },
  async deleteUser({ commit }, userId) {
    const client = this.app.apolloProvider.defaultClient
    await client.mutate({
      mutation: deleteUser,
      variables: {
        where: { id: userId },
      },
    })
    commit('DELETE_USER', userId)
  },
}
