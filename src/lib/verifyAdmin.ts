
import { cookies } from "next/headers";
import { adminAuth } from "./firebaseAdmin";
import { ADMIN_UID } from "./admin";

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("__session")?.value;

    if (!sessionCookie) {
      return null;
    }

    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );

    if (decodedToken.uid !== ADMIN_UID) {
      return null;
    }

    return decodedToken;
  } catch (error) {
    console.error("Admin verification failed:", error);
    return null;
  }
}
