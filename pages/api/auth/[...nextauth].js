import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import { defaultInstace } from "../../../Utilities";
import { defaultInstace } from '@/Utilities/AxiosInstance';

export default NextAuth({
    pages: {
        signIn: "/Admin"
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "UserName", type: "text", placeholder: "eposta" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const result = await defaultInstace.post(`/auth/local`, {
                    identifier: credentials.username,
                    password: credentials.password
                }).then(data => {
                    return data?.data;
                }).catch((err) => {
                    return null;
                });

                return result;

            }
        })
    ],

    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_JWT_SIGNING_SECRET,
    callbacks: {
        // async redirect({ url, baseUrl }) {
        //     return "/Admin/Dashboard";
        // },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.jwt = user.jwt;
                token.email = user.user.email;
                token.nameSurname = user.user.NameSurname;
            }
            return Promise.resolve(token);
        },
        async session({ session, token, user }) {
            session.jwt = token.jwt;
            session.email = token.email;
            session.nameSurname = token.nameSurname;

            return Promise.resolve(session);
        }
    }
});