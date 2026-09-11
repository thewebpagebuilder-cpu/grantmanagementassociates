import { NextResponse } from "next/server";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { createAdminSession, hashPassword, ALL_PERMISSIONS } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const rows = await db.select({ id: adminUsers.id }).from(adminUsers).limit(1);
  if (rows.length > 0) return NextResponse.json({ error: "Setup already complete." }, { status: 403 });
  
  const b = await req.json();
  if (!b.name || !b.email || !b.password || b.password.length < 6) return NextResponse.json({ error: "Name, email, and 6+ char password are required." }, { status: 400 });
  
  const [row] = await db.insert(adminUsers).values({
    name: b.name,
    email: b.email.toLowerCase().trim(),
    passwordHash: hashPassword(b.password),
    role: "owner",
    permissions: [...ALL_PERMISSIONS],
  }).returning({ id: adminUsers.id });
  
  await createAdminSession(row.id);
  return NextResponse.json({ ok: true });
}
