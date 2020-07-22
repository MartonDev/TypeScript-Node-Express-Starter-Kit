let users = [{ id: 0, name: 'test' }]

export const resolvers = {

  Query: {

    me () {
      
      return resolvers.User

    },
    // wip
    register (name: string) {

      users.push({ id: users.length, name })
      return users[users.length - 1]

    },
    users () {

      return users

    }

  },
  User: {

    id () {

      return users[0].id

    },
    name () {

      return users[0].name

    }

  }

}