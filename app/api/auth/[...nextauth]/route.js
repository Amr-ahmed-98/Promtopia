import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    // it's automatically create new user if there is no user
    async signIn({ profile }) {
      try {
        // we want to get the data about that user every single time
        await connectToDB();
        // 1) check if a user already exists\
        const userExists = await User.findOne({ email: profile.email });
        // 2) if not create new user by function and added to the database
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
