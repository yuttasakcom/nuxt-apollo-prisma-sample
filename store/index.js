import Users from '../graphql/user/query/users.gql'

export const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    const client = app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: Users,
      variables: {
        orderBy: 'updatedAt_DESC',
      },
    })

    if (data.users.length > 0) {
      dispatch('users/setUsers', data.users)
    }
  },
}
