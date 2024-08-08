import { postAxiosAPI } from "@/request/request";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Login",
      id: "login",

      credentials: {
        identifier: { label: "UserName", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await postAxiosAPI("auth/local", {
            identifier: credentials?.identifier,
            password: credentials?.password,
          });

          const { user, jwt } = res.data;

          //TODO: Find a solution to store token
          // try {
          //   secureLocalStorage.setItem("jwt", jwt);
          // } catch (error) {}

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            jwt: jwt,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // Add this line to return null in case of error
        }
      },
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    // CredentialsProvider({
    //   name: "Register",
    //   id: "register",

    //   credentials: {
    //     email: { label: "UserName", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   authorize: async (values) => {
    //     try {
    //       const res = await postAxiosAPI("auth/local/register", {
    //         username: values?.email,
    //         email: values?.email,
    //         password: values?.password,
    //         ...values,
    //       });

    //       const { user, jwt } = res.data;

    //       //TODO: Find a solution to store token
    //       // try {
    //       //   secureLocalStorage.setItem("jwt", jwt);
    //       // } catch (error) {}

    //       return {
    //         id: user.id,
    //         jwt: jwt,
    //       };
    //     } catch (error) {
    //       console.error("Authentication error:", error);
    //       return null; // Add this line to return null in case of error
    //     }
    //   },
    // }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }): Promise<any> {
      //TODO: better conditions beteween social and local auth
      if (user) {
        token.jwt = user.jwt;
        token.user = user;
      } else {
        if (account?.provider) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`
            );
            const data = await response.json();
            token.jwt = data.jwt;
            token.user = data.user;
          } catch (error) {
            console.error("Authentication error:", error);
          }
        }
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      session.jwt = token.jwt;
      session.user = token.user;
      return session;
    },
  },
};
