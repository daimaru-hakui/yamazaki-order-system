import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "@/firebase/server";
import { db } from "@/db";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {},
      authorize: async (credentials: any, req) => {
        const { idToken } = credentials;
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken);
            const user = {
              id: decoded.uid,
              emailVerified: decoded.email_verified,
              ...decoded,
            };
            return { ...user };
          } catch (err) {
            console.log(err);
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // const data = await db.user.findFirst({
      //   where: { id: token.uid },
      // });

      // if (!data) {
      //   await db.user.create({
      //     data: {
      //       id: token.uid,
      //       email: token.email || "",
      //     },
      //   });
      // }

      session.user.emailVerified = token.emailVerified;
      session.user.uid = token.uid;
      return session;
    },
  },
};
