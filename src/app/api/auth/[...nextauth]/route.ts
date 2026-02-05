// // // app/api/auth/[...nextauth]/route.ts
// // import NextAuth, { Session } from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import { PrismaClient } from "@prisma/client";
// // import bcrypt from "bcryptjs";
// // import { JWT } from "next-auth/jwt";

// // // Prisma singleton (recommended to avoid multiple instances in dev)
// // interface CustomGlobal extends globalThis.Global {
// //   prisma?: PrismaClient;
// // }

// // const globalForPrisma = globalThis as unknown as CustomGlobal;
// // const prisma = globalForPrisma.prisma || new PrismaClient();
// // if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// // if (process.env.NODE_ENV !== "production") (globalThis as CustomGlobal).prisma = prisma;

// // // ────────────────────────────────────────────────
// // // Module augmentations (keep these!)
// // declare module "next-auth" {
// //   interface User {
// //     role: string;
// //   }

// //   interface Session {
// //     user: {
// //       id: string;
// //       role: string;
// //       name?: string | null;
// //       email?: string | null;
// //       image?: string | null;
// //     };
// //   }
// // }

// // declare module "next-auth/jwt" {
// //   interface JWT {
// //     id?: string;
// //     role?: string;
// //   }
// // }

// // // ────────────────────────────────────────────────
// // // Config object – no explicit type needed
// // import { AuthOptions } from "next-auth";

// // const authConfig: AuthOptions = {
// //   providers: [
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         username: { label: "Username", type: "text" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         if (!credentials?.username || !credentials?.password) {
// //           return null;
// //         }

// //         const user = await prisma.user.findUnique({
// //           where: { username: credentials.username as string },
// //         });

// //         if (!user || !user.password) {
// //           return null;
// //         }

// //         const isValid = await bcrypt.compare(
// //           credentials.password as string,
// //           user.password
// //         );

// //         if (!isValid) {
// //           return null;
// //         }

// //         return {
// //           id: user.id,
// //           username: user.username,
// //           email: user.email ?? null,
// //           role: user.role,
// //         };
// //       },
// //     }),
// //   ],

// //   pages: {
// //     signIn: "/login", // optional
// //   },

// //   session: {
// //     strategy: "jwt",
// //   },

// //   callbacks: {
// //     async jwt({ token, user }: { token: unknown; user?: { id: string; role: string } | undefined }) {
// //       const typedToken = token as JWT;
// //       if (user) {
// //         typedToken.id = user.id;
// //         typedToken.role = user.role;
// //       }
// //       return typedToken;
// //     },

// //     async session({ session, token }: { session: Session; token: JWT }) {
// //       if (token?.id) {
// //         session.user.id = token.id as string;
// //       }
// //       if (token?.role) {
// //         session.user.role = token.role as string;
// //       }
// //       return session;
// //     },
// //   },

// //   secret: process.env.AUTH_SECRET,
// // };

// // const handler = NextAuth(authConfig);

// // export { handler as GET, handler as POST };


// // app/api/auth/[...nextauth]/route.ts

// import NextAuth, { Session } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import { JWT } from "next-auth/jwt";
// import { AuthOptions } from "next-auth";

// /* ---------------- Prisma Singleton ---------------- */

// interface CustomGlobal extends globalThis.Global {
//   prisma?: PrismaClient;
// }

// const globalForPrisma = globalThis as unknown as CustomGlobal;

// const prisma =
//   globalForPrisma.prisma || new PrismaClient({ log: ["query", "error"] });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// /* ---------------- Module Augmentation ---------------- */
// type Role = "ADMIN" | "USER";
// declare module "next-auth" {
//     interface User {
//         role: Role;
//       }

//   interface Session {
//     user: {
//       id: string;
//       role: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     role?: string;
//   }
// }

// /* ---------------- Auth Config ---------------- */

// const authConfig: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         console.log("➡️ authorize() called");
//         console.log("📩 Credentials:", credentials);

//         if (!credentials?.username || !credentials?.password) {
//           console.log("❌ Missing credentials");
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: { username: credentials.username },
//         });

//         console.log("👤 DB User:", user);

//         if (!user || !user.password) {
//           console.log("❌ User not found / no password");
//           return null;
//         }

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         console.log("🔐 Password valid:", isValid);

//         if (!isValid) {
//           console.log("❌ Invalid password");
//           return null;
//         }

//         const result = {
//           id: user.id,
//           username: user.username,
//           email: user.email ?? null,
//           role: user.role,
//         };

//         console.log("✅ Returning User:", result);

//         return result;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/login",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("➡️ JWT Callback");
//       console.log("🪙 Old Token:", token);
//       console.log("👤 User:", user);

//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }

//       console.log("🪙 New Token:", token);

//       return token;
//     },

//     async session({ session, token }) {
//       console.log("➡️ Session Callback");
//       console.log("📦 Session Before:", session);
//       console.log("🪙 Token:", token);

//       if (token?.id) {
//         session.user.id = token.id as string;
//       }

//       if (token?.role) {
//         session.user.role = token.role as string;
//       }

//       console.log("📦 Session After:", session);

//       return session;
//     },
//   },

//   debug: true, // 🔥 VERY IMPORTANT

//   secret: process.env.AUTH_SECRET,
// };

// /* ---------------- Handler ---------------- */

// const handler = NextAuth(authConfig);

// export { handler as GET, handler as POST };




import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

/* ======================================================
   Prisma Singleton (Prevents Multiple Instances in Dev)
====================================================== */

interface CustomGlobal extends globalThis.Global {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as unknown as CustomGlobal;

const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/* ======================================================
   Role Type (Matches Prisma Enum)
====================================================== */

type Role = "ADMIN" | "USER";

/* ======================================================
   NextAuth Type Augmentation
====================================================== */

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}

/* ======================================================
   Auth Configuration
====================================================== */

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username or Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          /* ---------------------------------------------
             Find User (Username OR Email)
          --------------------------------------------- */

          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { username: credentials.username },
                { email: credentials.username },
              ],
            },
          });

          if (!user || !user.password) {
            return null;
          }

          /* ---------------------------------------------
             Check Password
          --------------------------------------------- */

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            return null;
          }

          /* ---------------------------------------------
             Return User Object
          --------------------------------------------- */

          return {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role as Role,
          };
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],

  /* ======================================================
     Pages
  ===================================================== */

  pages: {
    signIn: "/login",
  },

  /* ======================================================
     Session
  ===================================================== */

  session: {
    strategy: "jwt",
  },

  /* ======================================================
     Callbacks
  ===================================================== */

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }

      return session;
    },
  },

  /* ======================================================
     Security
  ===================================================== */

  secret: process.env.AUTH_SECRET,

  debug: false, // Set true only when debugging
};

/* ======================================================
   Handler
====================================================== */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
