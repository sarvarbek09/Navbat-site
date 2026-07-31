import { cookies } from "next/headers";
import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";

const SESSION_COOKIE = "navbat_session";

export type SessionUser = {
  id: string;
  name: string;
  phone: string;
  role: "client" | "owner";
};

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!userId) return null;

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      phone: users.phone,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user ?? null;
}

export async function createSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAuth(role?: "client" | "owner") {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  if (role && session.role !== role) throw new Error("Forbidden");
  return session;
}
