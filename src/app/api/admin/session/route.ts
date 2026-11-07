
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../../../lib/firebaseAdmin";
import { ADMIN_UID } from "../../../../lib/admin";

export const runtime = "nodejs";

const COOKIE_NAME = "__session";
const EXPIRES_IN = 5 * 24 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication token required." },
        { status: 401 }
      );
    }

    const idToken = authorization.slice(7);

    const decodedToken = await adminAuth.verifyIdToken(idToken, true);

    if (decodedToken.uid !== ADMIN_UID) {
      return NextResponse.json(
        { error: "Unauthorized administrator." },
        { status: 403 }
      );
    }

    const sessionCookie = await adminAuth.createSessionCookie(
      idToken,
      { expiresIn: EXPIRES_IN }
    );

    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, sessionCookie, {
      ...cookieOptions,
      maxAge: EXPIRES_IN / 1000,
    });

    return response;
  } catch (error) {
    console.error("Admin session creation error:", error);

    return NextResponse.json(
      { error: "Unable to create admin session." },
      { status: 401 }
    );
  }
}

// VERIFY ADMIN SESSION
export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );

    if (decodedToken.uid !== ADMIN_UID) {
      return NextResponse.json(
        { authenticated: false },
        { status: 403 }
      );
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}

// ADMIN LOGOUT
export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, "", {
    ...cookieOptions,
    maxAge: 0,
  });

  return response;
}
