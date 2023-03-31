import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: process.env.google_id,
    //   clientSecret: process.env.google_secret,
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_KEY,
      clientSecret: process.env.GITHUB_SECRET_KEY,
    }),
  ],
  // pages: {
  //   signIn: '/signin',
  // },
  secret: process.env.NEXTAUTH_SECRET,
})
