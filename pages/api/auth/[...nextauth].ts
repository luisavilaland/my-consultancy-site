// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" }, // Puedes usar 'database' si prefieres sesiones persistentes
  pages: {
    signIn: "/api/auth/signin", // puedes cambiarlo por una /signin propia
  },
  callbacks: {
    async session({ session, token }) {
      // Adjunta el userId al session si lo necesitas en el front
      if (token?.sub) (session.user as any).id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions as any);
