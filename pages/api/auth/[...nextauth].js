import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
const { NEXT_PUBLIC_API_URI } = process.env

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { data } = await axios.post(NEXT_PUBLIC_API_URI + '/auth/local', {
          identifier: credentials.email,
          password: credentials.password,
        })
        if (data) {
          return data
        }

        return null
      },
    }),
  ],
  secret: '37d7fbf4a2b1af6aaaad02ee71111f2a',
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return user
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.jwt = user.jwt
        token.id = user.user.id
        token.name = user.user.username
        token.email = user.user.email
        token.role = user.user.role
      }
      return token
    },

    async session({ session, token, user }) {
      session.jwt = token.jwt
      session.id = token.id
      session.role = token.role
      return session
    },
  },
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth
