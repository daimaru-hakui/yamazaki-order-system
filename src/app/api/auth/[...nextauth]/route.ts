import NextAuth from "next-auth";
import { options } from "@/providers/options";
const handler = NextAuth(options);
export { handler as GET, handler as POST };
