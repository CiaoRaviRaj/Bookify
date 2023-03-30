import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export default NextAuth({

  providers: [
    GoogleProvider({
      clientId: process.env.google_id,
      clientSecret: process.env.google_secret,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  // secret: process.env.NEXTAUTH_SECRET,
})
