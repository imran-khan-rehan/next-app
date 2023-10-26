import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'signup',
      name: "credentials",
      async authorize(credentials, req) {
        console.log('signup')

        console.log(credentials.email, "name = " + credentials.username + "  password = " + credentials.password)
        try {
          const result = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.username,
              password: credentials.password,
              profile:'pending'
            },
          });
          // The record was successfully created
          console.log('User created:', result);
          return "user";
        } catch (error) {
          // Handle the error here
          if (error.code === 'P2002' && error.meta.target.includes('email')) {
            // Handle the duplicate email error
            console.error('Email already exists:', error.meta.target);
            return null;
          } else {
            // Handle other errors
            console.error('Error creating user:', error);
            return null;
          }
        } finally {
          // Make sure to disconnect from the database
          await prisma.$disconnect();
        }


      }
    }),
    CredentialsProvider({
      id: 'signin',
      name: "credentials",
      async authorize(credentials, req) {
        console.log("signin ")
        if (credentials.userId) {
          const id = credentials.userId;
          const name = credentials.name;
          console.log("credials ", id, name);
          return {
            userId: id

          };
        }
        else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  }
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }