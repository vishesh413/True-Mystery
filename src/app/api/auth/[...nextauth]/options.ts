import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { JWT } from 'next-auth/jwt';

// ✅ Extended JWT token type
interface ExtendedToken extends JWT {
  _id?: string;
  isVerified?: boolean;
  isAcceptingMessages?: boolean;
  username?: string;
}

// ✅ Extended session type
interface ExtendedSession extends Session {
  user: {
    _id: string;
    email: string;
    name?: string;
    image?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  };
}

// ✅ User returned by authorize
interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  image?: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  username: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.identifier || !credentials?.password) return null;

        await dbConnect();

        const userDoc = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier },
          ],
        });

        if (!userDoc) throw new Error('No user found with this email');
        if (!userDoc.isVerified) throw new Error('Please verify your account');

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          userDoc.password
        );

        if (!isPasswordCorrect) throw new Error('Incorrect password');

        const user = userDoc.toObject() as {
          _id: string;
          email: string;
          username: string;
          image?: string;
          isVerified: boolean;
          isAcceptingMessages: boolean;
        };

        return {
          id: user._id,
          email: user.email,
          name: user.username,
          image: user.image ?? undefined, //  FIXED HERE
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessages,
          username: user.username,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      const extendedToken: ExtendedToken = token;

      if (user) {
        const u = user as ExtendedUser;
        extendedToken._id = u.id;
        extendedToken.username = u.username;
        extendedToken.isVerified = u.isVerified;
        extendedToken.isAcceptingMessages = u.isAcceptingMessages;
      }

      return extendedToken;
    },

    async session({ session, token }) {
      const extendedSession = session as ExtendedSession;
      const extendedToken = token as ExtendedToken;

      if (extendedSession.user && extendedToken._id) {
        extendedSession.user._id = extendedToken._id;
        extendedSession.user.username = extendedToken.username ?? '';
        extendedSession.user.isVerified = extendedToken.isVerified ?? false;
        extendedSession.user.isAcceptingMessages =
          extendedToken.isAcceptingMessages ?? true;
      }

      return extendedSession;
    },
  },

  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
